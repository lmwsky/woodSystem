import {Component, OnInit} from "@angular/core";
import {Platform} from "ionic-angular";
import {StorageService} from "../../core/storage.service";
import {Setting} from "../../core/setting";
import {SettingService} from "../../core/setting.service";
import {StockService} from "../../core/stock.service";

/*
 Generated class for the PageSetting page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-page-setting',
  templateUrl: 'page-setting.html'
})
export class SettingPage implements OnInit {

  setting:Setting;

  constructor(private stockService:StockService, private settingService:SettingService, private storageService:StorageService, private platform:Platform) {
  }

  ngOnInit():void {
    this.setting = this.settingService.getSetting();
  }

  specificationTypeChange() {
    console.log("specificationTypeChange saved to db");
    this.settingService.changeSetting(this.setting).then(()=> {
      this.platform.exitApp();
    });
  }

  clearDB():Promise<any> {

    /*return this.storageService.clearDB().then(()=> {
     console.log("clearDB");
     this.platform.exitApp();
     });*/
    console.log("in setting page--");
    console.log(this.stockService.stockItemList);
    return null;
  }
}
