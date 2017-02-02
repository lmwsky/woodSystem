import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {BuyRecordService} from "../../core/buy-record.service";
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
export class BuyRecordPage implements OnInit{

  buyRecordList:BuyRecord[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public buyRecordService:BuyRecordService) {
  }
  ngOnInit():void {
    this.buyRecordService.getBuyRecords().then(buyRecordList=>this.buyRecordList=buyRecordList);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyRecordPage');
  }
  createNewBuy() {
    this.navCtrl.push(NewBuyPage, {});
  }
}
