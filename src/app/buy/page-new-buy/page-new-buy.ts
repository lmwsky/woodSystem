import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
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
export class NewBuyPage {
  specificationList:Specification[];

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public specificationService:SpecificationService,
              public buyRecordService:BuyRecordService) {
    this.specificationList = specificationService.getSpecifications();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBuyFormComponent');
  }
  onSubmit(newBuyRecord) {
    console.log('submit the form!');
    this.buyRecordService.addBuyRecord(newBuyRecord);
    this.navCtrl.popTo(BuyRecordPage);
    console.log(newBuyRecord);
  }
}
