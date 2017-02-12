/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {SpecificationService} from "./specification.service";
import {Storage} from '@ionic/storage';
import {StockItem} from "../shared/stock-item/stock-item.model";
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {SellRecord} from "../shared/sell-record/sell-record.model";
@Injectable()
export class StockService {
  stockItemList:StockItem[];
  static DATA_KEY = "stockTable";

  constructor(public specificationService:SpecificationService, public storage:Storage) {
  }

  updateStockItemByBuyRecord(buyRecord:BuyRecord):Promise<StockItem> {
    return new Promise<StockItem>((resolve, reject) => {
      this.getStockItemBySpecification(buyRecord.specificationId).then((stockItem)=> {
        stockItem.num += buyRecord.num;
        this.saveToDB(stockItem);
        resolve(stockItem);

      });
    });
  }

  updateStockItemBySellRecord(sellRecord:SellRecord):Promise<StockItem> {
    return new Promise<StockItem>((resolve, reject) => {
      this.getStockItemBySpecification(sellRecord.specificationId).then((stockItem)=> {
        stockItem.num -= sellRecord.num;
        this.saveToDB(stockItem);
        resolve(stockItem);

      });
    });
  }

  saveToDB(stockItem:StockItem) {
    this.storage.set(StockService.DATA_KEY, this.stockItemList);
  }

  getStockItemBySpecification(specificationId:number):Promise<StockItem> {
    return new Promise((resolve, reject) => {
      this.getStockItemList().then((stockItemList)=> {
        let selectStockItem = undefined;
        for (let stockItem of stockItemList) {
          if (stockItem.specificationId == specificationId) {
            selectStockItem = stockItem;
            break;
          }
        }
        if (!selectStockItem) {
          selectStockItem = new StockItem(0, specificationId, 0);
          this.createNewStockItem(selectStockItem).then((stockItem)=> {
            resolve(stockItem);
          });
        } else {
          resolve(selectStockItem);
        }
      });
    });
  }

  createNewStockItem(stockItem:StockItem):Promise<StockItem> {
    return new Promise((resolve, reject) => {
      this.getStockItemList().then((stockItemList)=> {
        stockItem.id = this.stockItemList.length + 1;
        stockItem.setSpecification(
          this.specificationService.getSpecificationById(stockItem.specificationId));
        this.stockItemList.push(stockItem);

        this.saveToDB(stockItem);
        resolve(stockItem);
      });
    });
  }

  initFromDB():Promise<StockItem[]> {
    return new Promise((resolve, reject) => { // (A)
      this.storage.get(StockService.DATA_KEY).then((vals) => {
        this.stockItemList = [];

        if (vals) {
          for (let val of vals) {
            let stockItem = new StockItem(val.id, val.specificationId, val.num);
            stockItem.setSpecification(this.specificationService.getSpecificationById(stockItem.specificationId));
            this.stockItemList.push(stockItem);
          }
        }
        resolve(this.stockItemList);
      });
    });
  }

  getStockItemList():Promise <StockItem[]> {
    if (this.stockItemList) {
      return Promise.resolve(this.stockItemList);
    } else {
      return this.initFromDB();
    }
  }
}
