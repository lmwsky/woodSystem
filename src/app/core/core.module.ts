/**
 * Created by isky on 2017/1/25.
 */
import {NgModule, ErrorHandler, Optional, SkipSelf} from "@angular/core";
import {SpecificationService} from "./specification.service";
import {BuyRecordService} from "./buy-record.service";
import {IonicErrorHandler} from "ionic-angular";
import { Storage } from '@ionic/storage';
import './rxjs-operators'
import {StockService} from "./stock.service";

@NgModule({
  imports: [
  ],
  declarations: [],

  exports: [],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: SpecificationService, useClass: SpecificationService},
    {provide: BuyRecordService, useClass: BuyRecordService},
    {provide: Storage, useFactory: provideStorage },
    {provide: StockService, useClass: StockService},

  ],
  //flowing is could be used in tabs container
  entryComponents: []
})
/**undefined
 * CoreModule for singleton service and these class only used once
 * only AppModule can import this CoreModule
 */
export class CoreModule {
  //guard for reimporting of CoreModule
  constructor(@Optional() @SkipSelf()
  parentModule:CoreModule){
    throwIfAlreadyLoaded(parentModule,'CoreModule');
  }
}

export function provideStorage() {
   return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });
}
function throwIfAlreadyLoaded(parentModule:any,moduleName:string){
  if(parentModule){
    throw new Error(`${moduleName} has already
    been loaded. Import Core modules in the AppModule only.`);
  }
}
