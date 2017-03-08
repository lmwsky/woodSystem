import {Component} from "@angular/core";
import {NavController, ToastController, Loading, LoadingController, AlertController} from "ionic-angular";
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
              public loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '继续添加出货确认',
      message: '添加成功,你想要继续添加出货吗',
      buttons: [
        {
          text: '继续',
          handler: () => {
            console.log('继续添加');
          }
        },
        {
          text: '结束',
          role: 'cancel',
          handler: () => {
            this.presentToast("出货结束");
            this.navCtrl.popTo(SellRecordPage);
          }
        }
      ]
    });
    alert.present();
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
    if (newSellRecord) {
      this.presentLoadingDefault("添加中");
      this.sellRecordService.sell(newSellRecord).then(()=> {
        this.sellRecordService.initStorageTableCache().then(()=> {
          this.loading.dismissAll();
          this.loading = undefined;
          this.presentConfirm();
        });
      });
    }else {
      console.log("newSellRecord is undefined");
    }
  }
  
}
