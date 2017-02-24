import {StorageCollection, IdObject} from "./storage-collection";
import {StorageIndexTable} from "./storage-index";
import {StorageService} from "./storage.service";
import {DateIndexItem} from "./storage-index-item";
/**
 * Created by isky on 2017/2/18.
 */
export class StorageTable<T extends IdObject> {
  //the storage loading in memory from db, is not complete
  collectionList:StorageCollection<T>[] = [];
  storageIndexTable:StorageIndexTable;

  nextLoadingPos:number = 0;

  constructor(public tableName:string, public storageService:StorageService) {
  }

  currentSize():number {
    return this.collectionList.length;
  }

  hasNext():boolean {
    return this.nextLoadingPos < this.storageIndexTable.getMaxSize();
  }

  initIndexTable():Promise<StorageIndexTable> {
    return new Promise<StorageIndexTable>((resolve, reject)=> {
      if (!this.storageIndexTable) {
        this.load(StorageTable.getIndexTableKey()).then((storageIndexTable:StorageIndexTable)=> {

          console.log(storageIndexTable);
          if (!storageIndexTable) {
            this.storageIndexTable = new StorageIndexTable();
            this.updateStorageIndexTableToDB().then(()=> {
              resolve(this.storageIndexTable);
            });
          } else {
            this.storageIndexTable = StorageIndexTable.clone(storageIndexTable);
            resolve(this.storageIndexTable);

          }
        }).catch(reject);
      } else {
        resolve(this.storageIndexTable);
      }
    });

  }

  static getIndexTableKey():string {
    return "IndexsTable";
  }

  /**
   * load one more index item data
   * @returns {boolean},true,load data,false has nothing to load
   */
  loadOneMore():Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=> {
      if (this.hasNext()) {
        this.loadCollectionByIndexPos(this.nextLoadingPos).then(()=> {
          this.nextLoadingPos++;
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  loadCollectionByIndexPos(indexPos:number):Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=> {
      let key = this.storageIndexTable.getIndexItemKeyByIndex(indexPos);
      this.load(key).then((collection)=> {
        this.collectionList.push(StorageCollection.clone<T>(collection));
        resolve(true);
      });
    });
  }

  loadTwoMore():Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=> {
      this.loadOneMore().then((loadResult:boolean)=> {
        if (loadResult) {
          this.loadOneMore().then(resolve).catch(reject);
        } else
          resolve(false);
      });
    });
  }

  loadThreeMore():Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=> {
      this.loadTwoMore().then((loadResult:boolean)=> {
        if (loadResult) {
          this.loadOneMore().then(resolve).catch(reject);
        } else
          resolve(false);
      });
    });
  }

  loadFiveMore():Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=> {
      this.loadTwoMore().then((loadResult:boolean)=> {
        if (loadResult) {
          this.loadThreeMore().then(resolve).catch(reject);
        } else
          resolve(false);
      });
    });
  }

  /**
   * load all collection by promise
   * @returns {Promise.all}
     */
  loadAll():Promise<any> {
    let promiseList = [];
    this.collectionList=[];
    for (let i = 0; i < this.storageIndexTable.getMaxSize(); i++) {
      promiseList.push(this.loadCollectionByIndexPos(i));
    }
    return Promise.all(promiseList).then(()=>{
      this.nextLoadingPos=this.storageIndexTable.getMaxSize();
      console.log("this.nextLoadingPos="+this.nextLoadingPos);
    });
  }

  /**
   * create a new Index in index table for date
   * @param date
   */
  createNewIndex(date:Date):Promise<any> {
    return new Promise((resolve, reject)=> {
      if (!this.storageIndexTable.include(date)) {

        let insertPos = this.storageIndexTable.insert(date);
        console.log("insertPos=" + insertPos);
        console.log(this);

        let indexItem = this.storageIndexTable.getIndexItem(insertPos);
        let storageCollection = new StorageCollection<T>(indexItem);
        if (insertPos < this.nextLoadingPos) {
          this.collectionList.splice(insertPos, 0, storageCollection);
          console.log(this.collectionList);

          this.nextLoadingPos++;
        }
        console.log();
        this.updateStorageCollectionToDB(storageCollection).then(()=> {
          this.updateStorageIndexTableToDB().then(resolve);
        });
      } else {
        resolve();
      }
    });
  }

  remove(pos:number, date:Date):Promise<any> {
    return new Promise((resolve, reject)=> {
      let indexItem:DateIndexItem = this.storageIndexTable.getIndexItemByDate(date);
      if (indexItem) {
        this.load(indexItem.getIndex()).then((collectionInDB:StorageCollection<T>)=> {
          let collectionInMemory:StorageCollection<T> = this.getCollectionByDate(date);
          if (collectionInMemory) {
            collectionInMemory.remove(pos);
          }
          collectionInDB = StorageCollection.clone<T>(collectionInDB);
          collectionInDB.remove(pos);
          this.updateStorageCollectionToDB(collectionInDB).then(resolve).catch(reject);

        }).catch(reject);
      } else {
        resolve();
      }
    });
  }

  add(item:T, date:Date):Promise<any> {
    return new Promise((resolve, reject)=> {
      let onfulfilled = ()=> {
        let indexItemKey = this.storageIndexTable.getIndexItemKeyByDate(date);

        this.load(indexItemKey).then((collectionInDB:StorageCollection<T>)=> {
          let collectionInMemory:StorageCollection<T> = this.getCollectionByDate(date);
          if (collectionInMemory) {
            collectionInMemory.push(item);
          }
          collectionInDB = StorageCollection.clone<T>(collectionInDB);
          collectionInDB.push(item);
          this.updateStorageCollectionToDB(collectionInDB).then(resolve).catch(reject);
        }).catch(reject);
      };
      if (!this.storageIndexTable.include(date)) {
        this.createNewIndex(date).then(onfulfilled);
      } else {
        onfulfilled();
      }

    });
  }

  getCollectionByDate(date:Date):StorageCollection<T> {
    for (let collection of this.collectionList) {
      if (collection.include(date))
        return collection;
    }
    return undefined;
  }


  private buildKey(key:string):string {
    return this.tableName + "@" + key;
  }

  private store(key:string, value:any):Promise<any> {
    return this.storageService.set(
      this.buildKey(key),
      value);
  }

  private load(key):Promise<any> {
    return this.storageService.get(this.buildKey(key));
  }

  updateStorageIndexTableToDB():Promise<any> {
    return this.store(StorageTable.getIndexTableKey(), this.storageIndexTable);
  }

  updateStorageCollectionToDB(storageCollection:StorageCollection<T>):Promise<any> {
    return this.store(storageCollection.getKey(), storageCollection);
  }

  updateStorageCollectionToDBByIndex(index:number):Promise<any> {
    return this.updateStorageCollectionToDB(this.collectionList[index]);
  }

}
