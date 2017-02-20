import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading} from "ionic-angular";
import {StockService} from "../../core/stock.service";
import {StockItem} from "../../shared/stock-item/stock-item.model";

/*
 Generated class for the Stock page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {

  stockItemList:StockItem[];
  private loading:Loading;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public stockService:StockService,
              public loadingCtrl:LoadingController) {
  }

  ngOnInit():void {
    this.presentLoadingDefault("加载数据中");

    this.stockService.getStockItemList().then((stockItemList)=> {
      this.stockItemList = stockItemList;
      this.loading.dismissAll();
      this.loading = undefined;
    });
  }

  presentLoadingDefault(hint:string) {
    this.loading = this.loadingCtrl.create({
      content: hint
    });
    this.loading.present();
  }
}
