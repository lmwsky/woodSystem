/**
 * Created by isky on 2017/2/17.
 */
export interface IndexItem {
  getIndex():string;
}
export class DateIndexItem implements IndexItem {
  constructor(public date:Date) {
  }

  getIndex():string {
    return this.date.toDateString();
  }

  isInclude(date:Date):boolean {
    return this.date.toDateString() == date.toDateString();
  }
  compareTo(dateIndexItem:DateIndexItem):boolean{
    return this.date>dateIndexItem.date;
  }

  after(dateIndexItem:DateIndexItem) {
    return this.date>=dateIndexItem.date;
  }
}
export class StringIndexItem implements IndexItem {
  constructor(public str:string) {
  }

  getIndex():string {
    return this.str;
  }
}
