/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {SpecificationService} from "./specification.service";
import {Storage} from "@ionic/storage";
import {StockItem} from "../shared/stock-item/stock-item.model";
import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {SellRecord} from "../shared/sell-record/sell-record.model";
import {StorageKeyStore} from "./storage-key-store";
@Injectable()
export class StockService {
  stockItemList:StockItem[]=[];

  constructor(public specificationService:SpecificationService,
              public storage:Storage,
              private keyStore:StorageKeyStore) {
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
    this.storage.set(this.keyStore.getKeyForStockItems(), this.stockItemList);
  }

  getStockItemBySpecification(specificationId:number):Promise<StockItem> {
    return new Promise((resolve, reject) => {
      if (specificationId == undefined) {
        reject();
        return;
      }
      let stockItemList=this.getStockItemList();
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

  }

  createNewStockItem(stockItem:StockItem):Promise<StockItem> {
    return new Promise((resolve, reject) => {
      let stockItemList=this.getStockItemList();
        stockItem.id = stockItemList.length + 1;

        console.log("createNewStockItem");
        console.log(stockItem);
      
        stockItem.setSpecification(
          this.specificationService.getSpecificationById(stockItem.specificationId));
        this.stockItemList.push(stockItem);

        this.saveToDB(stockItem);
        resolve(stockItem);
      });
  }
  clearCache(){
    this.stockItemList.splice(0,this.stockItemList.length);
  }
  initFromDB():Promise<StockItem[]> {
    return new Promise((resolve, reject) => {
      let keyForStockItems = this.keyStore.getKeyForStockItems();
      this.storage.get(keyForStockItems).then((vals) => {
        console.log("-----init stock item from db for key " + keyForStockItems);
        console.log(vals);
        console.log("------");
        this.clearCache();
        if (vals) {
          for (let val of vals) {
            let stockItem = new StockItem(val.id, val.specificationId, val.num);
            stockItem.setSpecification(this.specificationService.getSpecificationById(stockItem.specificationId));
            this.stockItemList.push(stockItem);
          }
        }
        console.log("-----this.stockItemList ");
        console.log(this.stockItemList);
        console.log("------");
        resolve(this.stockItemList);
      });
    });
  }

  getStockItemList():StockItem[]{
      return this.stockItemList;
  }
}
