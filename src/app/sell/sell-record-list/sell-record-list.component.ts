/**
 * Created by isky on 2017/1/25.
 */
import {Component, Input, OnInit} from "@angular/core";
import {SellRecord} from "../../shared/sell-record/sell-record.model";
import {StorageTable} from "../../core/storage-table";

/*

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'sell-record-list',
  templateUrl: 'sell-record-list.component.html'
})
export class SellRecordListComponent implements OnInit {
  ngOnInit():void {
  }

  @Input()
  sellRecordStorageTable:StorageTable<SellRecord>;
  
  constructor() {
  }
  onClickLoadMore(){
    this.sellRecordStorageTable.loadThreeMore();
  }
}
