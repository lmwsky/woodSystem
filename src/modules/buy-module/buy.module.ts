/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {BuyRecordPage} from "./page-buy-record/page-buy-record";
import {NewBuyPage} from "./page-new-buy/page-new-buy";

@NgModule({
  imports: [
    IonicModule.forRoot(BuyModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    BuyRecordPage,
    NewBuyPage
  ],

  exports: [
    BuyRecordPage,
    NewBuyPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    BuyRecordPage,
    NewBuyPage
  ]
})
export class BuyModule {
}
