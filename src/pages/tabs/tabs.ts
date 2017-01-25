import { Component } from '@angular/core';

import {StockPage} from "../stock/stock";
import {BuyRecordPage} from "../../modules/buy-module/page-buy-record/page-buy-record"
import {SellRecordPage} from "../page-sell-record/page-sell-record"
import {StatisticsPage} from "../page-statistics/page-statistics"
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
