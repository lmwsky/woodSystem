import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {StorageFactory} from "../../core/storage-factory";

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
    this.newBuyRecord = StorageFactory.createBuyRecord();
    if (this.specifications) {
      let selectedSpecification = this.specifications[0];
      this.newBuyRecord.setSpecification(selectedSpecification);
    }
    this.dateStr = this.newBuyRecord.time.toLocaleDateString();
  }

  @Input()
  specifications:Specification[];
  newBuyRecord:BuyRecord;

  dateStr:string = new Date().toLocaleDateString();
  @Output()
  submitEvent = new EventEmitter();

  @Output()
  cancelEvent = new EventEmitter();

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

  onCancel() {
    this.cancelEvent.emit("cancel");
  }

  onChangeSpecification(specification:Specification) {
    this.newBuyRecord.setSpecification(specification);
    this.computeSumVolume();
  }

  onChangeDate(dateStr:string) {
    if (dateStr) {
      this.dateStr = dateStr;
      this.newBuyRecord.timeStr = dateStr;
      this.newBuyRecord.time = new Date(dateStr);
    }
  }

  onChangeSinglePrice(singlePrice:string) {
    this.newBuyRecord.singlePrice = Number.parseFloat(singlePrice);
    this.computeSumPrice();
    this.resetActualSumPrice();
  }

  onChangeNum(num:string) {
    this.newBuyRecord.num = Number.parseFloat(num);
    this.computeSumVolume();
    this.computeSumPrice();
    this.resetActualSumPrice()
  }

}
