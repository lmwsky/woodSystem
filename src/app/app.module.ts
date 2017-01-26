import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {BuyModule} from "../modules/buy-module/buy.module";
import {SellModule} from "../modules/sell-module/sell.module";
import {StockModule} from "../modules/stock-module/satistics.module";
import {SettingModule} from "../modules/setting-module/setting.module";
import {StatisticsModule} from "../modules/statistics-module/satistics.module";
import {TabsPageModule} from "../modules/tab-module/tab.module";
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
