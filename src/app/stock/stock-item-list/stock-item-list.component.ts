/**
 * Created by isky on 2017/1/25.
 */
import {Component, Input, OnInit} from "@angular/core";
import {StockItem} from "../../shared/stock-item/stock-item.model";

/*

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'stock-item-list',
  templateUrl: 'stock-item-list.component.html'
})
export class StockItemListComponent implements OnInit {
  ngOnInit():void {
    if (this.stockItemList) {
    } else {
      console.log("this.stockItemList is undefined");
    }
  }

  @Input()
  stockItemList:StockItem[];
  
  constructor() {
  }
  
}
