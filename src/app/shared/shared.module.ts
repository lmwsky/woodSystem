/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    IonicModule.forRoot(SharedModule),
    CommonModule,
    FormsModule
  ],
  declarations: [
  ],

  exports: [
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
  //flowing is could be used in tabs container
  entryComponents: [
  ]
})
export class SharedModule {
}
