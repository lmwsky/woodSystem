/**
 * Created by isky on 2017/1/25.
 */
import {IonicModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";

@NgModule({
  imports: [
    IonicModule.forRoot(SharedModule),
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  declarations: [],

  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [],
  //flowing is could be used in tabs container
  entryComponents: []
})
export class SharedModule {
}
