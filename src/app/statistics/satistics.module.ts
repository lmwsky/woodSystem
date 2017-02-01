/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StatisticsPage} from "./page-statistics/page-statistics";

@NgModule({
  imports: [
    IonicModule.forRoot(StatisticsModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    StatisticsPage
  ],

  exports: [
    StatisticsPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    StatisticsPage
  ]
})
export class StatisticsModule {
}
