import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NewSellPage} from "../page-new-sell/page-new-sell";
import {SellRecord} from "../../shared/sell-record/sell-record.model";
import {SellRecordService} from "../../core/sell-record.service";
/*
  Generated class for the PageSellRecord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sell-record',
  templateUrl: 'page-sell-record.html'
})
export class SellRecordPage {

  sellRecordList:SellRecord[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sellRecordService:SellRecordService) {
  }
  ngOnInit():void {
    this.sellRecordService.getSellRecords().then(sellRecordList=>this.sellRecordList=sellRecordList);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SellRecordPage');
  }
  createNewSell() {
    this.navCtrl.push(NewSellPage, {});
  }


}
