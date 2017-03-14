import {Injectable} from "@angular/core";
import {Setting} from "./setting";
import {StorageService} from "./storage.service";
/**
 * Created by isky on 2017/3/14.
 */

@Injectable()
export class SettingService {
  setting:Setting = new Setting();
  static KEY_SETTING = "setting";

  constructor(public storageService:StorageService) {
  }

  initSetting():Promise<any> {
    return new Promise((resolve, reject) => {
      this.storageService.get(SettingService.KEY_SETTING).then((setting)=> {
        if (setting) {
          this.setting = setting;
        } else {
          this.setting = new Setting();
        }
        resolve();
      });
    });
  }

  getSetting():Setting {
    return this.setting;
  }

  getSpecificationType():string {
    return this.setting.specificationType;
  }

  isSpecificationTypeEqualToRound():boolean {
    return this.setting.specificationType == Setting.SHAPE_ROUND;
  }

  isSpecificationTypeEqualToSquare():boolean {
    return this.setting.specificationType == Setting.SHAPE_SQUARE;
  }

  changeSetting(setting:Setting):Promise<any> {
    this.setting = setting;
    return this.storageService.set(SettingService.KEY_SETTING, setting);
  }
}
