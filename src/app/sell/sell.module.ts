/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PageNewSellPage} from "./page-new-sell/page-new-sell";
import {SellRecordPage} from "./page-sell-record/page-sell-record";


@NgModule({
  imports: [
    IonicModule.forRoot(SellModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    PageNewSellPage,
    SellRecordPage
  ],

  exports: [
    PageNewSellPage,
    SellRecordPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    PageNewSellPage,
    SellRecordPage
  ]
})
export class SellModule {
}
