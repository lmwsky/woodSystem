/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {StockService} from "./stock.service";
import {SellRecord} from "../shared/sell-record/sell-record.model";
import {StorageService} from "./storage.service";
import {StorageTable} from "./storage-table";
import {StorageCollection} from "./storage-collection";
import {StorageKeyStore} from "./storage-key-store";
@Injectable()
export class SellRecordService {
  storageTable:StorageTable<SellRecord>;

  constructor(public storageService:StorageService,
              public stockService:StockService,
              private keyStore:StorageKeyStore) {
  }

  getStorageTable():Promise<StorageTable<SellRecord>> {
    return new Promise((resolve, reject) => {
      if (!this.storageTable) {
        this.storageService.initStorageTable<SellRecord>(this.keyStore.getKeyForSellRecord()).then((storageTable)=> {
          this.storageTable = storageTable;
          console.log(this.storageTable);
          resolve(this.storageTable);
        }).catch(reject);
      } else {
        resolve(this.storageTable);
      }
    });
  }

  sell(sellRecord:SellRecord):Promise<SellRecord> {
    return new Promise((resolve, reject) => {
      this.storageTable.add(sellRecord, new Date(sellRecord.timeStr)).then(()=> {
        this.stockService.updateStockItemBySellRecord(sellRecord).then(()=> {
          resolve(sellRecord);
        });
      });
    });
  }

  getSellRecords():Promise <StorageCollection<SellRecord>[]> {
    return new Promise((resolve, reject) => {
      this.getStorageTable().then((storageTable:StorageTable<SellRecord>)=> {
        resolve(storageTable.collectionList);
      });
    });
  }

  initStorageTableCache():Promise<boolean> {
    if (this.storageTable) {
      return this.storageTable.loadOneMore();
    } else {
      return Promise.resolve(false);
    }
  }
}
