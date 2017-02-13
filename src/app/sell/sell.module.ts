/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NewSellPage} from "./page-new-sell/page-new-sell";
import {SellRecordPage} from "./page-sell-record/page-sell-record";
import {NewSellFormComponent} from "./new-sell-form/new-sell-form.component";
import {SellRecordListComponent} from "./sell-record-list/sell-record-list.component";


@NgModule({
  imports: [
    IonicModule.forRoot(SellModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    NewSellPage,
    SellRecordPage,
    NewSellFormComponent,
    SellRecordListComponent
  ],

  exports: [
    NewSellPage,
    SellRecordPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    NewSellPage,
    SellRecordPage
  ]
})
export class SellModule {
}
