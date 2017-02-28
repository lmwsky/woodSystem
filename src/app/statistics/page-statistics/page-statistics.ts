import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../core/storage.service";

/*
  Generated class for the PageStatistics page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-statistics',
  templateUrl: 'page-statistics.html'
})
export class StatisticsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private storageService:StorageService) {}
  
  clearDB(){
    this.storageService.clearDB().then(()=>{
      console.log("clearDB");
    });
  }
}
