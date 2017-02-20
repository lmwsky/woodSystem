/**
 * Created by isky on 2017/1/25.
 */
import {Component, Input, OnInit} from "@angular/core";
import {StorageCollection} from "../../core/storage-collection";
import {SellRecord} from "../../shared/sell-record/sell-record.model";

/*

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'date-sell-record-list',
  templateUrl: 'date-sell-record-list.component.html'
})
export class DateSellRecordListComponent implements OnInit {
  ngOnInit():void {
  }
  @Input()
  collection:StorageCollection<SellRecord>;
  
  constructor() {
  }

}

