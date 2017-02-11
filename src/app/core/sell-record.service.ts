/**
 * Created by isky on 2017/1/25.
 */
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {Injectable} from "@angular/core";
import {SpecificationService} from "./specification.service";
import {Storage} from '@ionic/storage';
@Injectable()
export class SellRecordService {
  buyRecordList:BuyRecord[];
  private isInit = false;
  static DATA_KEY = "stockItemList";

  constructor(public specificationService:SpecificationService, public storage:Storage) {
  }

  addBuyRecord(buyRecord:BuyRecord):Promise<BuyRecord> {
    return new Promise((resolve, reject) => { // (A)
      let add = ()=> {
        if (!this.buyRecordList) {
          this.buyRecordList = [];
        }
        buyRecord.id = this.buyRecordList.length + 1;
        this.buyRecordList.push(buyRecord);
        this.storage.set(SellRecordService.DATA_KEY, this.buyRecordList);
        resolve(buyRecord);
      };
      console.log("add");

      console.log(buyRecord);
      if (this.buyRecordList) {
        console.log("add to not empty");

        add();
      } else {
        console.log("add to empty");

        this.initFromDB().then(()=> {
          add();
        });
      }

    });

  }

  initFromDB():Promise<BuyRecord[]> {
    // set a key/value
    //storage.set('name', 'Max');
    // Or to get a key/value pair
    /*
     this.storage.get('name').then((val) => {

     console.log('Your name is', val);
     })*/
    return new Promise((resolve, reject) => { // (A)
      this.storage.get(SellRecordService.DATA_KEY).then((val) => {
        this.buyRecordList = val;
        resolve(this.buyRecordList);
      });
    });
  }

  getBuyRecords():Promise <BuyRecord[] > {
    if (this.buyRecordList) {
      return Promise.resolve(this.buyRecordList);
    } else {
      return this.initFromDB();
    }
  }
}
