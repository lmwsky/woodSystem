/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {BuyRecordService} from "./buy-record.service";
import {SellRecordService} from "./sell-record.service";

@Injectable()
export class UpdateAppService {
  constructor(public storage:Storage,
              public buyRecordService:BuyRecordService,
              public sellRecordService:SellRecordService) {
  }

  fillDataId():Promise<any> {
    return new Promise<any>((resolve, reject)=> {
      this.storage.get("isUpdateId").then((isFillDataId)=> {
        console.log("isUpdateId=" + isFillDataId);
        if (!isFillDataId) {
          this.buyRecordService.getStorageTable()
            .then(this.fillIdForStorageTable())
            .then(()=> {
              return this.sellRecordService.getStorageTable();
            })
            .then(this.fillIdForStorageTable())
            .then(()=> {
              return this.storage.set("isUpdateId", true);
            })
            .then(resolve)
            .then(()=> {
              console.log("update db data id successfully");
            });

        } else {
          resolve();
        }
      });
    });
  }

  private fillIdForStorageTable() {
    return (table)=> {
      table.loadAll().then(()=> {
        for (let collection of table.collectionList) {
          for (let i = 0; i < collection.data.length; i++) {
            collection.data[i].id = i;
          }
          collection.maxId = collection.data.length;
          table.updateStorageCollectionToDB(collection);
        }
        console.log("set all id");
        console.log(table);
      });
    };
  }
}
