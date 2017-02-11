/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StockPage} from "./stock/stock";
import {StockItemListComponent} from "./stock-item-list/stock-item-list.component";

@NgModule({
  imports: [
    IonicModule.forRoot(StockModule),
    CommonModule,
    FormsModule
  ],
  declarations: [StockItemListComponent,
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
