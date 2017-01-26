import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

import {BuyRecordPage} from "../page-buy-record/page-buy-record";
import {Specification} from "../../../app/shared/specification/specification.model";
import {BuyRecord} from "../../../app/shared/buy-record/buy-record.model";
import {SpecificationService} from "../../../app/core/specification.service";
import {BuyRecordService} from "../../../app/core/buy-record.service";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'form-new-buy',
  templateUrl: 'new-buy-form.component.html'
})
export class NewBuyFormComponent {
  specifications:Specification[];
  selectedSpecification:Specification;
  newBuyRecord:BuyRecord;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public specificationService:SpecificationService,
              public buyRecordService:BuyRecordService) {
    this.specifications = specificationService.getSpecifications();
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

  onSubmit() {
    console.log('submit the form!');
    this.buyRecordService.addBuyRecord(this.newBuyRecord);
    this.navCtrl.popTo(BuyRecordPage);
  }

}
