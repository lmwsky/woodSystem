/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {BuyRecordPage} from "./page-buy-record/page-buy-record";
import {NewBuyPage} from "./page-new-buy/page-new-buy";
import {NewBuyFormComponent} from "./new-buy-form/new-buy-form.component";
import {BuyRecordListComponent} from "./buy-record-list/buy-record-list.component";
import {DateBuyRecordListComponent} from "./date-buy-record-list/date-buy-record-list.component";
import {BuyFormComponent} from "./new-buy-form/buy-form.component";

@NgModule({
  imports: [
    IonicModule.forRoot(BuyModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    BuyRecordPage,
    NewBuyPage,
    BuyRecordListComponent,
    DateBuyRecordListComponent,
    NewBuyFormComponent,
    BuyFormComponent
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
