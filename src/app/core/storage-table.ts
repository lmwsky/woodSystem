import {StorageCollection} from "./storage-collection";
import {StorageIndexTable} from "./storage-index";
import {StorageService} from "./storage.service";
import {DateIndexItem} from "./storage-index-item";
/**
 * Created by isky on 2017/2/18.
 */
export class StorageTable<T> {
  //the storage loading in memory from db, is not complete
  collectionList:StorageCollection<T>[] = [];
  storageIndexTable:StorageIndexTable;

  nextLoadingPos:number = 0;

  constructor(public tableName:string, public storageService:StorageService) {
    this.initIndexTable();
  }

  hasNext():boolean {
    return this.nextLoadingPos < this.storageIndexTable.size();
  }

  initIndexTable():void {
    if (!this.storageIndexTable) {
      this.storageIndexTable = this.load(this.getIndexTableKey());
      if (!this.storageIndexTable) {
        this.storageIndexTable = new StorageIndexTable();
        this.updateStorageIndexTableToDB();
      }
    }
  }

  private getIndexTableKey():string {
    return "key";
  }

  /**
   * load one more index item data
   * @returns {boolean},true,load data,false has nothing to load
   */
  loadMore():boolean {
    if (this.hasNext()) {
      let key = this.storageIndexTable.getIndexItemKeyByIndex(this.nextLoadingPos);
      let collection = this.load(key);
      this.collectionList.push(collection);
      this.nextLoadingPos++;
      return true;
    } else {
      return false;
    }
  }

  /**
   * create a new Index in index table for date
   * @param date
   */
  createNewIndex(date:Date) {
    if (!this.storageIndexTable.include(date)) {
      let insertPos = this.storageIndexTable.insert(date);
      let indexItem = this.storageIndexTable.getIndexItem(insertPos);
      let storageCollection = new StorageCollection<T>(indexItem);

      this.updateStorageCollectionToDB(storageCollection);
      this.updateStorageIndexTableToDB();

      if (insertPos < this.nextLoadingPos) {
        this.collectionList.splice(insertPos, 0, storageCollection);
        this.nextLoadingPos++;
      }
    }
  }

  remove(pos:number, date:Date) {
    let indexItem:DateIndexItem = this.storageIndexTable.getIndexItemByDate(date);
    if (indexItem) {
      let collectionInDB:StorageCollection<T> = this.load(indexItem.getIndex());
      collectionInDB.remove(pos);

      this.updateStorageCollectionToDB(collectionInDB);

      let collectionInMemory:StorageCollection<T> = this.getCollectionByDate(date);
      if (collectionInMemory) {
        collectionInMemory.remove(pos);
      }
    }
  }

  add(item:T, date:Date) {
    if (!this.storageIndexTable.include(date)) {
      this.createNewIndex(date);
    }
    let indexItemKey = this.storageIndexTable.getIndexItemKeyByDate(date);

    let collectionInDB:StorageCollection<T> = this.load(indexItemKey);
    collectionInDB.push(item);
    this.updateStorageCollectionToDB(collectionInDB);

    let collectionInMemory:StorageCollection<T> = this.getCollectionByDate(date);
    if (collectionInMemory) {
      collectionInMemory.push(item);
    }
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

  private store(key:string, value:any) {
    this.storageService.set(
      this.buildKey(key),
      value);
  }

  private load(key):any {
    return this.storageService.get(this.buildKey(key));
  }

  updateStorageIndexTableToDB() {
    return this.store(this.getIndexTableKey(), this.storageIndexTable);
  }

  updateStorageCollectionToDB(storageCollection:StorageCollection<T>) {
    this.store(storageCollection.getKey(), storageCollection);
  }

  updateStorageCollectionToDBByIndex(index:number) {
    this.updateStorageCollectionToDB(this.collectionList[index]);
  }

}
