/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {Storage} from '@ionic/storage';
import {StorageTable} from "./storage-table";

@Injectable()
export class StorageService {
  constructor(public storage:Storage) {
  }
  setAsyn(key:string,value:any):Promise<any>{
    return this.storage.set(key,value);
  }
  getAsyn(key:string):Promise<any> {
    return this.storage.get(key);
  }
  set(key:string,value:any):any{
    return this.storage.setItem(key,value);
  }
  get(key:string):any {
    return this.storage.getItem(key);
  }
  /**
   * create storage table for the T type
   * @param tableName,the table name for this storageTable
   * @param obj
   */
  createStorageTable<T>(tableName:string, obj:T):StorageTable<T> {
    return new StorageTable<T>(tableName,this);
  }
}
