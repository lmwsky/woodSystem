/**
 * Created by isky on 2017/1/25.
 */
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {Injectable} from "@angular/core";
import {SpecificationService} from "./specification.service";
import {Storage} from '@ionic/storage';
import {StockService} from "./stock.service";
import {SellRecord} from "../shared/sell-record/sell-record.model";
@Injectable()
export class SellRecordService {
  sellRecordList:SellRecord[];
  private isInit = false;
  static DATA_KEY = "sellRecordTable";

  constructor(public stockService:StockService, public specificationService:SpecificationService, public storage:Storage) {
  }

  sell(sellRecord:SellRecord):Promise<SellRecord> {
    return new Promise((resolve, reject) => {
      this.addSellRecord(sellRecord).then((buyRecord)=> {
        this.stockService.updateStockItemBySellRecord(sellRecord).then(()=> {
          resolve(buyRecord);
        });
      });
    });
  }

  addSellRecord(sellRecord:SellRecord):Promise<SellRecord> {
    return new Promise((resolve, reject) => {

      this.getSellRecords().then((buyRecordList)=> {
        sellRecord.id = this.sellRecordList.length + 1;
        sellRecord.setSpecification(
          this.specificationService.getSpecificationById(sellRecord.specificationId));

        this.sellRecordList.push(sellRecord);

        this.saveToDB(sellRecord);
        resolve(sellRecord);
      });
    });
  }

  saveToDB(sellRecord:SellRecord) {
    this.storage.set(SellRecordService.DATA_KEY, this.sellRecordList);
  }

  initFromDB():Promise<SellRecord[]> {
    return new Promise((resolve, reject) => { // (A)
      this.storage.get(SellRecordService.DATA_KEY).then((val) => {
        if (val) {
          this.sellRecordList = val;
        } else {
          this.sellRecordList = []
        }
        resolve(this.sellRecordList);
      });
    });
  }

  getSellRecords():Promise <SellRecord[]> {
    if (this.sellRecordList) {
      return Promise.resolve(this.sellRecordList);
    } else {
      return this.initFromDB();
    }
  }
}
