import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {TabsPage} from "../pages/tabs/tabs";
import {StockPage} from "../pages/stock/stock";
import {BuyRecordPage} from "../pages/page-buy-record/page-buy-record";
import {SellRecordPage} from "../pages/page-sell-record/page-sell-record";
import {StatisticsPage} from "../pages/page-statistics/page-statistics";
import {PageNewBuyPage} from "../pages/page-new-buy/page-new-buy";
import {PageNewSellPage} from '../pages/page-new-sell/page-new-sell'


@NgModule({
  declarations: [
    MyApp,
    StockPage,
    BuyRecordPage,
    SellRecordPage,
    StatisticsPage,
    PageNewBuyPage,
    PageNewSellPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StockPage,
    BuyRecordPage,
    SellRecordPage,
    StatisticsPage,
    PageNewBuyPage,
    PageNewSellPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
