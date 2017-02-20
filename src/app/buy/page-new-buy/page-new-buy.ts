import {Component, OnInit} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
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

  constructor(public navCtrl:NavController,
              public specificationService:SpecificationService,
              public buyRecordService:BuyRecordService,
              public toastCtrl:ToastController) {
  }

  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  onSubmit(newBuyRecord) {
    this.buyRecordService.buy(newBuyRecord).then(()=> {
      this.presentToast("添加成功");
      this.navCtrl.popTo(BuyRecordPage);
    });
  }

  onCancel() {
    this.navCtrl.popTo(BuyRecordPage);
  }
}
