import {DateIndexItem} from "./storage-index-item";
/**
 * Created by isky on 2017/2/17.
 */
export class StorageCollection<T> {
  data:T[] = [];

  constructor(public indexItem:DateIndexItem) {
  }

  push(t:T) {
    this.data.push(t);
  }

  remove(index) {
    this.data = this.data.splice(index, 1);
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
  getDateStr():string{
    return this.indexItem.dateStr;
  }

  static clone<T>(collection):StorageCollection<T> {
    let cloneCollection = new StorageCollection<T>(DateIndexItem.clone(collection.indexItem));
    cloneCollection.data = collection.data;

    return cloneCollection;

  }
}
