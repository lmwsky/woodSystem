/**
 * Created by isky on 2017/2/17.
 */
export interface IndexItem {
  getIndex():string;
}
export class DateIndexItem {
  date:Date;

  constructor(public dateStr:string) {
    this.date = new Date(dateStr);
  }

  getIndex():string {
    return this.dateStr;
  }

  isInclude(date:Date):boolean {
    return this.date.toLocaleDateString() == date.toLocaleDateString();
  }

  compareTo(dateIndexItem:DateIndexItem):boolean {
    return this.date > dateIndexItem.date;
  }

  after(dateIndexItem:DateIndexItem) {
    return this.date >= dateIndexItem.date;
  }

  static clone(dateIndexItem):DateIndexItem {
    return new DateIndexItem(dateIndexItem.dateStr);
  }
}

