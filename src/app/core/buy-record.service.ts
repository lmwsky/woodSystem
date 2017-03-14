/**
 * Created by isky on 2017/1/25.
 */
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {Injectable} from "@angular/core";
import {StockService} from "./stock.service";
import {StorageTable} from "./storage-table";
import {StorageService} from "./storage.service";
import {StorageCollection} from "./storage-collection";
import {StorageKeyStore} from "./storage-key-store";
@Injectable()
export class BuyRecordService {
  storageTable:StorageTable<BuyRecord>;

  constructor(public storageService:StorageService,
              public stockService:StockService,
              private keyStore:StorageKeyStore) {
  }

  clearCache():void {
    this.storageTable = undefined;
  }

  initStorageTableCache():Promise<boolean> {
    if (this.storageTable) {
      return this.storageTable.loadOneMore();
    } else {
      return Promise.resolve(false);
    }
  }

  getStorageTable():Promise<StorageTable<BuyRecord>> {
    return new Promise((resolve, reject) => {
      if (!this.storageTable) {
        this.storageService.initStorageTable<BuyRecord>(this.keyStore.getKeyForBuyRecord()).then((storageTable)=> {
          this.storageTable = storageTable;
          console.log(this.storageTable);
          resolve(this.storageTable);
        }).catch(reject);
      } else {
        resolve(this.storageTable);
      }
    });
  }

  buy(buyRecord:BuyRecord):Promise<BuyRecord> {
    return new Promise((resolve, reject) => {
      this.storageTable.add(buyRecord, new Date(buyRecord.timeStr)).then(()=> {
        this.stockService.updateStockItemByBuyRecord(buyRecord).then(()=> {
          resolve(buyRecord);
        });
      });
    });
  }

  getBuyRecords():Promise <StorageCollection<BuyRecord>[]> {
    return new Promise((resolve, reject) => {
      this.getStorageTable().then((storageTable:StorageTable<BuyRecord>)=> {
        resolve(storageTable.collectionList);
      });
    });
  }
}
