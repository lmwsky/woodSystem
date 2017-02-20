import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
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
  ngOnInit():void {
    this.specificationService.getSpecifications().then(
      specificationList => this.specificationList = specificationList);
  }

  specificationList:Specification[];

  constructor(public navCtrl:NavController,
              public specificationService:SpecificationService,
              public sellRecordService:SellRecordService,
              public toastCtrl:ToastController) {
  }

  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  onSubmit(newSellRecord) {
    this.sellRecordService.sell(newSellRecord).then(()=> {
      this.presentToast("添加成功");
      this.navCtrl.popTo(SellRecordPage);
      console.log(newSellRecord);
    });
  }

  onCancel() {
    this.navCtrl.popTo(SellRecordPage);
  }
}
