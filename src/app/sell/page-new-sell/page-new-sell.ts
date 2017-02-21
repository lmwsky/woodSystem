import {Component} from "@angular/core";
import {NavController, ToastController, Loading, LoadingController} from "ionic-angular";
import {Specification} from "../../shared/specification/specification.model";
import {SpecificationService} from "../../core/specification.service";
import {SellRecordService} from "../../core/sell-record.service";
import {SellRecordPage} from "../page-sell-record/page-sell-record";

/*
 Generated class for the PageNewSell page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-sell',
  templateUrl: 'page-new-sell.html'
})
export class NewSellPage {
  private loading:Loading;

  ngOnInit():void {
    this.specificationService.getSpecifications().then(
      specificationList => this.specificationList = specificationList);
  }

  specificationList:Specification[];

  constructor(public navCtrl:NavController,
              public specificationService:SpecificationService,
              public sellRecordService:SellRecordService,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController) {
  }

  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 500
    });
    toast.present();
  }

  presentLoadingDefault(hint:string) {
    this.loading = this.loadingCtrl.create({
      content: hint
    });
    this.loading.present();
  }

  onSubmit(newSellRecord) {
    this.presentLoadingDefault("添加中");
    this.sellRecordService.sell(newSellRecord).then(()=> {
      this.sellRecordService.initStorageTableCache().then(()=> {
        this.loading.dismissAll();
        this.loading = undefined;
        this.presentToast("添加成功");
        this.navCtrl.popTo(SellRecordPage);
        console.log(newSellRecord);
      });
    });
  }
  
}
