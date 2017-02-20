import {DateIndexItem} from "./storage-index-item";
/**
 * Created by isky on 2017/2/17.
 */
export class StorageIndexTable {
  indexItems:DateIndexItem[] = [];

  constructor() {
  }

  push(date:Date) {
    this.indexItems.push(new DateIndexItem(date.toLocaleDateString()));
  }

  insertToHead(date:Date):DateIndexItem {
    let dateItem = new DateIndexItem(date.toLocaleDateString());
    this.indexItems.splice(0, 0, dateItem);
    return dateItem;
  }

  insert(date:Date):number {
    let dateItem = new DateIndexItem(date.toLocaleDateString());

    for (let insertPos = 0; insertPos < this.indexItems.length; insertPos++) {
      let currentIndexItem = this.indexItems[insertPos];
      if (dateItem.after(currentIndexItem)) {
        this.indexItems.splice(insertPos, 0, dateItem);
        return insertPos;
      }
    }
    this.indexItems.push(dateItem);
    return this.maxSize() - 1;
  }

  maxSize():number {
    return this.indexItems.length;
  }

  getMaxSize():number {
    return this.indexItems.length;
  }

  getIndexItemKeyByIndex(index:number):string {
    if (index >= this.maxSize())
      return undefined;
    else
      return this.indexItems[index].getIndex();
  }

  getIndexItem(index:number):DateIndexItem {
    if (index >= this.maxSize())
      return undefined;
    else
      return this.indexItems[index];
  }

  getIndexItemKeyByDate(date:Date):string {
    for (let indexItem of this.indexItems) {
      if (indexItem.isInclude(date))
        return indexItem.getIndex();
    }
    return undefined;
  }

  getIndexItemByDate(date:Date):DateIndexItem {
    for (let indexItem of this.indexItems) {
      if (indexItem.isInclude(date))
        return indexItem;
    }
    return undefined;
  }

  /**
   * sort by date descending
   */
  private sort() {

  }

  include(date:Date):boolean {
    return !!this.getIndexItemKeyByDate(date);
  }

  static clone(storageIndexTable):StorageIndexTable {
    let cloneStorageIndexTable = new StorageIndexTable();
    for (let indexItem of storageIndexTable.indexItems) {
      cloneStorageIndexTable.indexItems.push(DateIndexItem.clone(indexItem));
    }
    return cloneStorageIndexTable;
  }
}
