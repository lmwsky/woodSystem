import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {FormsModule} from "@angular/forms";
import {MyApp} from "./app.component";
import {TabsPage} from "../pages/tabs/tabs";
import {StockPage} from "../pages/stock/stock";
import {SellRecordPage} from "../pages/page-sell-record/page-sell-record";
import {StatisticsPage} from "../pages/page-statistics/page-statistics";
import {PageNewSellPage} from "../pages/page-new-sell/page-new-sell";
import {SpecificationService} from "../model/specification/specication.service";
import {BuyRecordService} from "../modules/buy-module/buy-record/buy.record.service";
import {BuyModule} from "../modules/buy-module/buy.module";
import {BuyRecordPage} from "../modules/buy-module/page-buy-record/page-buy-record";


@NgModule({
  declarations: [
    MyApp,
    StockPage,
    SellRecordPage,
    StatisticsPage,
    PageNewSellPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    BuyModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StockPage,
    SellRecordPage,
    StatisticsPage,
    PageNewSellPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: SpecificationService, useClass: SpecificationService},
    {provide: BuyRecordService, useClass: BuyRecordService}

  ]
})
export class AppModule {
}
