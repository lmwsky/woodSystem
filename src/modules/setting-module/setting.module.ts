/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SettingPage} from "./page-setting/page-setting";

@NgModule({
  imports: [
    IonicModule.forRoot(SettingModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
    SettingPage
  ],

  exports: [
    SettingPage
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
    SettingPage
  ]
})
export class SettingModule {
}
