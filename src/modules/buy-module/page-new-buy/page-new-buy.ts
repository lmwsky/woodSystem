import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

import {BuyRecordPage} from "../page-buy-record/page-buy-record";
import {Specification} from "../../../model/specification/Specification";
import {BuyRecord} from "../buy-record/buy.record";
import {SpecificationService} from "../../../model/specification/specication.service";
import {BuyRecordService} from "../buy-record/buy.record.service";

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
  specifications:Specification[];
  selectedSpecification:Specification;
  newBuyRecord:BuyRecord;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public specificationService:SpecificationService,
              public buyRecordService:BuyRecordService) {
    this.specifications = specificationService.getSpecications();
    this.selectedSpecification = this.specifications[0];
    this.newBuyRecord = new BuyRecord(0, this.selectedSpecification.id, 0, 0, 0, 0, 0, new Date());
  }

  computeSumPrice() {
    this.newBuyRecord.computeSumPrice = this.newBuyRecord.num * this.newBuyRecord.singlePrice;
  }

  resetActualSumPrice() {
    this.newBuyRecord.actualSumPrice = this.newBuyRecord.computeSumPrice;

  }

  computeSumVolume() {
    this.newBuyRecord.sumVolume = this.newBuyRecord.num * this.selectedSpecification.volume;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBuyPage');
  }

  onSubmit() {
    console.log('submit the form!');
    this.buyRecordService.addBuyRecord(this.newBuyRecord);
    this.navCtrl.popTo(BuyRecordPage);
  }

}
