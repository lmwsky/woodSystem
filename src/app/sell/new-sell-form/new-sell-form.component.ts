import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {SellRecord} from "../../shared/sell-record/sell-record.model";
import {StockService} from "../../core/stock.service";
import {StorageFactory} from "../../core/storage-factory";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'form-new-sell',
  templateUrl: 'new-sell-form.component.html'
})
export class NewSellFormComponent implements OnInit {
  ngOnInit():void {
    this.newSellRecord = StorageFactory.createSellRecord();
    if (this.specifications) {
      let selectedSpecification = this.specifications[0];
      this.onChangeSpecification(selectedSpecification);
    }
    this.dateStr = this.newSellRecord.time.toLocaleDateString();

  }

  @Input()
  specifications:Specification[];
  newSellRecord:SellRecord;

  dateStr:string = new Date().toLocaleDateString();
  @Output()
  submitEvent = new EventEmitter();

  @Output()
  cancelEvent = new EventEmitter();

  stockItemNum:number = 0;

  constructor(public stockService:StockService) {
  }

  computeSumPrice() {
    this.newSellRecord.computeSumPrice = this.newSellRecord.num * this.newSellRecord.singlePrice;
  }

  resetActualSumPrice() {
    this.newSellRecord.actualSumPrice = this.newSellRecord.computeSumPrice;
  }

  computeSumVolume() {
    this.newSellRecord.sumVolume = this.newSellRecord.num * this.newSellRecord.specification.volume;
  }

  onSubmit() {
    if (this.newSellRecord.specification) {
      this.stockService.getStockItemBySpecification(this.newSellRecord.specificationId).then((stockItem)=> {
        this.stockItemNum = stockItem.num;
        if (stockItem.num >= this.newSellRecord.num)
          this.submitEvent.emit(this.newSellRecord);
      });
    }
  }

  onCancel() {
    this.cancelEvent.emit("cancel");
  }

  onChangeSpecification(specification:Specification) {
    this.stockService.getStockItemBySpecification(specification.id).then((stockItem)=> {
      if (stockItem) {
        this.stockItemNum = stockItem.num;
      } else {
        this.stockItemNum = 0;
      }
    });
    this.newSellRecord.setSpecification(specification);
    this.computeSumVolume();
  }

  onChangeSinglePrice(singlePrice) {
    this.newSellRecord.singlePrice = Number.parseFloat(singlePrice);
    this.computeSumPrice();
    this.resetActualSumPrice();
  }

  onChangeNum(num) {
    this.newSellRecord.num = Number.parseFloat(num);
    this.computeSumVolume();
    this.computeSumPrice();
    this.resetActualSumPrice()
  }

  onChangeDate(dateStr:string) {
    if (dateStr) {
      this.dateStr = dateStr;
      this.newSellRecord.timeStr = dateStr;
      this.newSellRecord.time = new Date(dateStr);
    }
  }
}
