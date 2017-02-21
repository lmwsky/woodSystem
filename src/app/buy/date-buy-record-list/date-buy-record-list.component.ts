/**
 * Created by isky on 2017/1/25.
 */
import {Component, Input, OnInit} from "@angular/core";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {StorageCollection} from "../../core/storage-collection";
import {StatisticsUtil} from "../../shared/statistics-util";

/*

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'date-buy-record-list',
  templateUrl: 'date-buy-record-list.component.html'
})
export class DateBuyRecordListComponent implements OnInit {
  ngOnInit():void {
  }

  @Input()
  collection:StorageCollection<BuyRecord>;

  constructor() {
  }

  countSpecificationNum():number {
    return StatisticsUtil.countSpecificationNum(this.collection);
  }
  countSumVolume():number {
    return StatisticsUtil.countSumVolume(this.collection);
  }
  countSumPrice():number {
    return StatisticsUtil.countSumPrice(this.collection);
  }
}

