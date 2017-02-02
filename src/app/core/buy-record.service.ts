/**
 * Created by isky on 2017/1/25.
 */
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {Injectable} from "@angular/core";


@Injectable()
export class BuyRecordService {
  buyRecordList:BuyRecord[] = [];

  constructor() {
  }

  addBuyRecord(buyRecord:BuyRecord) {
    this.buyRecordList.push(buyRecord);
  }

  getBuyRecords():Promise<BuyRecord[]> {
    return Promise.resolve(this.buyRecordList);
  }
}
