import { Component } from '@angular/core';
import {StockPage} from "../../../app/stock/stock/stock";
import {BuyRecordPage} from "../../../app/buy/page-buy-record/page-buy-record";
import {StatisticsPage} from "../../../app/statistics/page-statistics/page-statistics";
import {SellRecordPage} from "../../../app/sell/page-sell-record/page-sell-record";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StockPage;
  tab2Root: any = BuyRecordPage;
  tab3Root: any = SellRecordPage;
  tab4Root: any = StatisticsPage;

  constructor() {

  }
}
