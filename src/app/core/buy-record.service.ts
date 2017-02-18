/**
 * Created by isky on 2017/1/25.
 */
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {Injectable} from "@angular/core";
import {SpecificationService} from "./specification.service";
import {Storage} from "@ionic/storage";
import {StockService} from "./stock.service";
@Injectable()
export class BuyRecordService {
  buyRecordList:BuyRecord[];
  private isInit = false;
  static DATA_KEY = "buyRecordTable";

  constructor(public stockService:StockService, public specificationService:SpecificationService, public storage:Storage) {
  }

  buy(buyRecord:BuyRecord):Promise<BuyRecord> {
    return new Promise((resolve, reject) => {
      this.addBuyRecord(buyRecord).then((buyRecord)=> {
        this.stockService.updateStockItemByBuyRecord(buyRecord).then(()=> {
          resolve(buyRecord);
        });
      });
    });
  }

  addBuyRecord(buyRecord:BuyRecord):Promise<BuyRecord> {
    return new Promise((resolve, reject) => {

      this.getBuyRecords().then((buyRecordList)=> {
        buyRecord.id = this.buyRecordList.length + 1;
        buyRecord.setSpecification(
          this.specificationService.getSpecificationById(buyRecord.specificationId));

        this.buyRecordList.push(buyRecord);

        this.saveToDB(buyRecord);
        resolve(buyRecord);
      });
    });
  }

  saveToDB(buyRecord:BuyRecord) {
    this.storage.set(BuyRecordService.DATA_KEY, this.buyRecordList);
  }

  initFromDB():Promise<BuyRecord[]> {
    return new Promise((resolve, reject) => { // (A)
      this.storage.get(BuyRecordService.DATA_KEY).then((val) => {
        if (val) {
          this.buyRecordList = val;
        } else {
          this.buyRecordList = []
        }
        resolve(this.buyRecordList);
      });
    });
  }

  getBuyRecords():Promise <BuyRecord[]> {
    if (this.buyRecordList) {
      return Promise.resolve(this.buyRecordList);
    } else {
      return this.initFromDB();
    }
  }
}
