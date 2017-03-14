/**
 * Created by isky on 2017/1/25.
 */
import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {BuyRecordService} from "./buy-record.service";
import {SellRecordService} from "./sell-record.service";
import {SettingService} from "./setting.service";
import {SpecificationService} from "./specification.service";
import {StockService} from "./stock.service";
import {UpdateAppService} from "./update-app.service";

@Injectable()
export class InitAppService {
  isInit:boolean=false;
  constructor(public buyRecordService:BuyRecordService,
              public sellRecordService:SellRecordService,
              private settingService:SettingService,
              private specificationService:SpecificationService,
              private stockService:StockService,
              private updateAppService:UpdateAppService) {
  }

  initApp():Promise<any>{
    if(this.isInit)
      return Promise.resolve();
    else {
      this.isInit=true;
      return this.settingService.initSetting().
      then(()=>this.specificationService.initSpecificationList()).
      then(()=>this.stockService.initFromDB()).
      then(()=>this.updateAppService.fillDataId());
    }
    
  }

}
