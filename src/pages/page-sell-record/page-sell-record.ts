import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PageNewSellPage} from '../page-new-sell/page-new-sell'
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellRecordPage');
  }
  createNewSell() {
    console.log('createNewSell');
    this.navCtrl.push(PageNewSellPage, {});
  }


}
