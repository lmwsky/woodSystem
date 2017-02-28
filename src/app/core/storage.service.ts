/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {StorageTable} from "./storage-table";
import {StorageIndexTable} from "./storage-index";
import {IdObject} from "./storage-collection";

@Injectable()
export class StorageService {
  static DEFAULT_INIT_PAGE = 5;

  constructor(public storage:Storage) {
  }

  setAsyn(key:string, value:any):Promise<any> {
    return this.storage.set(key, value);
  }

  getAsyn(key:string):Promise<any> {
    return this.storage.get(key);
  }

  set(key:string, value:any):Promise<any> {
    return this.storage.set(key, value);
  }

  get(key:string):Promise<any> {
    return this.storage.get(key);
  }

  /**
   * create storage table for the T type
   * @param tableName,the table name for this storageTable
   */
  private createStorageTable<T extends IdObject>(tableName:string):StorageTable<T> {
    return new StorageTable<T>(tableName, this);
  }

  initStorageTable<T extends IdObject>(tableName:string):Promise<StorageTable<T>> {
    return new Promise<StorageTable<T>>((resolve, reject)=> {
      let storageTable = this.createStorageTable<T>(tableName);
      let onfulfilled = (storageIndexTable:StorageIndexTable)=> {
        storageTable.loadOneMore().then(()=> {
          resolve(storageTable);
        }).catch(reject);
      };
      storageTable.initIndexTable().then(onfulfilled);
    });
  }

  clearDB() :Promise<null>{
    return this.storage.clear();
  }
}
