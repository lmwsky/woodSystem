import {DateIndexItem} from "./storage-index-item";
/**
 * Created by isky on 2017/2/17.
 */
export class StorageIndexTable {
  private indexItems:DateIndexItem[] = [];

  constructor() {
  }

  push(date:Date) {
    this.indexItems.push(new DateIndexItem(date));
  }

  insertToHead(date:Date):DateIndexItem {
    let dateItem = new DateIndexItem(date);
    this.indexItems = this.indexItems.splice(0, 0, dateItem);
    return dateItem;
  }

  insert(date:Date):number {
    let dateItem = new DateIndexItem(date);

    for (let insertPos = 0; insertPos < this.indexItems.length; insertPos++) {
      let currentIndexItem = this.indexItems[insertPos];
      if (dateItem.after(currentIndexItem)) {
        this.indexItems = this.indexItems.splice(insertPos, 0, dateItem);
        return insertPos;
      }
    }
    this.indexItems.push(dateItem);
    return this.size() - 1;
  }

  size():number {
    return this.indexItems.length;
  }

  getIndexItemKeyByIndex(index:number):string {
    if (index >= this.size())
      return undefined;
    else
      return this.indexItems[index].getIndex();
  }

  getIndexItem(index:number):DateIndexItem {
    if (index >= this.size())
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
}
