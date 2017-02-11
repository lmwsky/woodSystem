import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
            public stockService:StockService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
  }
  ngOnInit():void {
    this.stockService.getStockItemList().then(stockItemList=>this.stockItemList=stockItemList);
  }
}
