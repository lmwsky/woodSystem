import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {BuyModule} from "./buy/buy.module";
import {SellModule} from "./sell/sell.module";
import {StockModule} from "./stock/stock.module";
import {SettingModule} from "./setting/setting.module";
import {StatisticsModule} from "./statistics/statistics.module";
import {TabsPageModule} from "./tab/tab.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SharedModule,
    CoreModule,
    BuyModule,
    SellModule,
    StockModule,
    SettingModule,
    StatisticsModule,
    TabsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
  ]
})
export class AppModule {
}
