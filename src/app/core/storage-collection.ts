import {DateIndexItem} from "./storage-index-item";
/**
 * Created by isky on 2017/2/17.
 */
export interface IdObject {
  id:number;
}
export class StorageCollection<T extends IdObject> {
  data:T[] = [];
  maxId = 0;

  constructor(public indexItem:DateIndexItem) {
  }

  push(t:T) {
    console.log("push");
    console.log(this);
    console.log(t);
    t.id = this.maxId;
    this.maxId++;
    this.data.push(t);
  }

  size():number {
    if (this.data) {
      return this.data.length;
    } else {
      return 0;
    }
  }

  remove(index) {
    this.data.splice(index, 1);
  }

  getKey():string {
    return this.indexItem.getIndex();
  }

  include(date:Date):boolean {
    return this.indexItem.isInclude(date);
  }

  getDate():Date {
    return this.indexItem.date;
  }

  getDateStr():string {
    return this.indexItem.dateStr;
  }

  static clone<T extends IdObject>(collection):StorageCollection<T> {
    let cloneCollection = new StorageCollection<T>(DateIndexItem.clone(collection.indexItem));
    cloneCollection.data = collection.data;
    cloneCollection.maxId=collection.maxId;
    return cloneCollection;
  }
}
