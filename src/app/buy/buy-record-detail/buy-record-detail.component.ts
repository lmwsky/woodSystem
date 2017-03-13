import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {StorageFactory} from "../../core/storage-factory";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {biggerThanZero} from "../../shared/validators/validators";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'buy-record-detail',
  templateUrl: 'buy-record-detail.html'
})
export class BuyRecordDetailComponent implements OnInit {
  @Input()
  buyRecord:BuyRecord;
  @Input()
  showDelete:Boolean;
  
  @Output("onDelete")
  onDeleteEventEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit():void {
  }
  onDelete() {
    this.onDeleteEventEmitter.emit(this.buyRecord);
  }
}
