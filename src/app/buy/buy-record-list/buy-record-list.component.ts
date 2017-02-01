/**
 * Created by isky on 2017/1/25.
 */
import {Component, Input, OnInit} from "@angular/core";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";

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
    if (this.buyRecordList) {
    } else {
      console.log("this.buyRecordList is undefined");
    }
  }

  @Input()
  buyRecordList:BuyRecord[];
  
  constructor() {
  }
  
}
