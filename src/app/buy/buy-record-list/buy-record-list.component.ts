/**
 * Created by isky on 2017/1/25.
 */
import {Component, Input, OnInit} from "@angular/core";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {StorageTable} from "../../core/storage-table";

/*

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'buy-record-list',
  templateUrl: 'buy-record-list.component.html'
})
export class BuyRecordListComponent implements OnInit {
  ngOnInit():void {
  }

  @Input()
  buyRecordStorageTable:StorageTable<BuyRecord>;

  constructor() {
  }
  onClickLoadMore(){
    this.buyRecordStorageTable.loadThreeMore();
  }
}
