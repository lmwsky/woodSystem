import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BuyRecord} from "../buy-record/buy.record";
import {BuyRecordService} from "../buy-record/buy.record.service";
import {NewBuyPage} from "../page-new-buy/page-new-buy";


/*
  Generated class for the PageBuyRecord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy-record',
  templateUrl: 'page-buy-record.html'
})
export class BuyRecordPage {

  buyRecordList:BuyRecord[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public buyRecordService:BuyRecordService) {
    this.buyRecordList=buyRecordService.getBuyRecords();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyRecordPage');
  }
  createNewBuy() {
    this.navCtrl.push(NewBuyPage, {});
  }
}
