/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TabsPage} from "./tabs/tabs";

@NgModule({
  imports: [
    IonicModule.forRoot(TabsPageModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    TabsPage
  ],

  exports: [
    TabsPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    TabsPage
  ]
})
export class TabsPageModule {
}
