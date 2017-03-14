import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading} from "ionic-angular";
import {StockService} from "../../core/stock.service";
import {StockItem} from "../../shared/stock-item/stock-item.model";
import {InitAppService} from "../../core/init-app.service";

/*
 Generated class for the Stock page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage implements OnInit{

  stockItemList:StockItem[];
  private loading:Loading;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public stockService:StockService,
              private initAppService:InitAppService,
              public loadingCtrl:LoadingController) {
  }

  ngOnInit():void {
    this.presentLoadingDefault("加载数据中");
    this.initAppService.initApp().then(()=>{
      this.stockItemList = this.stockService.getStockItemList();
      if(!this.stockItemList){
        console.log("Error!!!!!");
      }
      else{
        console.log("-----this.stockItemList in page ");
        console.log(this.stockItemList);
        console.log("------");
      }
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
