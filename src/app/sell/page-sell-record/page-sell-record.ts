import {Component} from "@angular/core";
import {NavController, Loading, LoadingController} from "ionic-angular";
import {NewSellPage} from "../page-new-sell/page-new-sell";
import {SellRecord} from "../../shared/sell-record/sell-record.model";
import {SellRecordService} from "../../core/sell-record.service";
import {StorageTable} from "../../core/storage-table";
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

  sellRecordStorageTable:StorageTable<SellRecord>;

  private loading:Loading;

  constructor(public navCtrl:NavController,
              public sellRecordService:SellRecordService,
              public loadingCtrl:LoadingController) {
  }

  presentLoadingDefault(hint:string) {
    this.loading = this.loadingCtrl.create({
      content: hint
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.presentLoadingDefault("加载数据中");
    this.sellRecordService.getStorageTable().then((sellRecordStorageTable)=> {

      this.sellRecordStorageTable = sellRecordStorageTable;
      this.loading.dismissAll();
      this.loading = undefined;
    });
  }

  createNewSell() {
    this.navCtrl.push(NewSellPage, {});
  }


}
