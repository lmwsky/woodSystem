/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StockPage} from "./stock/stock";

@NgModule({
  imports: [
    IonicModule.forRoot(StockModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    StockPage
  ],

  exports: [
    StockPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    StockPage
  ]
})
export class StockModule {
}
