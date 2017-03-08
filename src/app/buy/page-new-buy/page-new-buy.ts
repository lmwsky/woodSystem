import {Component, OnInit} from "@angular/core";
import {NavController, ToastController, LoadingController, Loading, AlertController} from "ionic-angular";
import {SpecificationService} from "../../core/specification.service";
import {Specification} from "../../shared/specification/specification.model";
import {BuyRecordService} from "../../core/buy-record.service";
import {BuyRecordPage} from "../page-buy-record/page-buy-record";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-buy',
  templateUrl: 'page-new-buy.html'
})
export class NewBuyPage implements OnInit {
  ngOnInit():void {
    this.specificationService.getSpecifications().then(
      specificationList => this.specificationList = specificationList);

  }

  specificationList:Specification[];
  private loading:Loading;

  constructor(public navCtrl:NavController,
              public specificationService:SpecificationService,
              public buyRecordService:BuyRecordService,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '继续添加进货确认',
      message: '添加成功,你想要继续添加进货吗',
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
            this.presentToast("进货结束");
            this.navCtrl.popTo(BuyRecordPage);
          }
        }
      ]
    });
    alert.present();
  }

  onSubmit(newBuyRecord) {
    if (newBuyRecord) {
      console.log(newBuyRecord);
      this.presentLoadingDefault("添加中");
      this.buyRecordService.buy(newBuyRecord).then(()=> {
        this.buyRecordService.initStorageTableCache().then(()=> {
          this.loading.dismissAll();
          this.loading = undefined;
          this.presentConfirm();
        });
      });
    } else {
      console.log("newBuyRecord undefined");
    }

  }

}
