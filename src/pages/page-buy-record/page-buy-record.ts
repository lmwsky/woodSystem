import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PageNewBuyPage} from "../page-new-buy/page-new-buy";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyRecordPage');
  }
  createNewBuy() {
    this.navCtrl.push(PageNewBuyPage, {});
  }
}
