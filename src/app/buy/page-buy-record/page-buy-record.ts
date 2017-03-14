import {Component} from "@angular/core";
import {NavController, LoadingController, Loading} from "ionic-angular";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {BuyRecordService} from "../../core/buy-record.service";
import {NewBuyPage} from "../page-new-buy/page-new-buy";
import {StorageTable} from "../../core/storage-table";


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

  buyRecordStorageTable:StorageTable<BuyRecord>;

  private loading:Loading;

  constructor(public navCtrl:NavController,
              public buyRecordService:BuyRecordService,
              public loadingCtrl:LoadingController) {
  }

  ionViewWillEnter() {
    this.presentLoadingDefault("加载数据中");
    this.buyRecordService.getStorageTable().then((buyRecordStorageTable)=> {

      this.buyRecordStorageTable = buyRecordStorageTable;
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

  createNewBuy() {
    this.navCtrl.push(NewBuyPage, {});
  }
}
