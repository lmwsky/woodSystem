import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'form-new-buy',
  templateUrl: 'new-buy-form.component.html'
})
export class NewBuyFormComponent implements OnInit {
  ngOnInit():void {
    this.newBuyRecord = new BuyRecord(0, 0, 0, 0, 0, 0, 0, new Date());

    if (this.specifications) {
      let selectedSpecification = this.specifications[0];
      this.newBuyRecord.setSpecification(selectedSpecification);
    } else {
      console.log("this.specifications is undefined");
    }
  }

  @Input()
  specifications:Specification[];
  newBuyRecord:BuyRecord;

  @Output()
  submitEvent = new EventEmitter();

  constructor() {
  }

  computeSumPrice() {
    this.newBuyRecord.computeSumPrice = this.newBuyRecord.num * this.newBuyRecord.singlePrice;
  }

  resetActualSumPrice() {
    this.newBuyRecord.actualSumPrice = this.newBuyRecord.computeSumPrice;
  }

  computeSumVolume() {
    this.newBuyRecord.sumVolume = this.newBuyRecord.num * this.newBuyRecord.specification.volume;
  }

  onSubmit() {
    if (this.newBuyRecord.specification)
      this.submitEvent.emit(this.newBuyRecord);

  }

  onChangeSpecification(specification:Specification) {
    this.newBuyRecord.setSpecification(specification);
    this.computeSumVolume();
  }

  onChangeSinglePrice(singlePrice) {
    this.newBuyRecord.singlePrice = Number.parseFloat(singlePrice);
    this.computeSumPrice();
    this.resetActualSumPrice();
  }

  onChangeNum(num) {
    this.newBuyRecord.num = Number.parseFloat(num);
    this.computeSumVolume();
    this.computeSumPrice();
    this.resetActualSumPrice()
  }

}
