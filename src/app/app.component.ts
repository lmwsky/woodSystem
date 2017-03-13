import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {TabsPage} from "./tab/tabs/tabs";
import {UpdateAppService} from "./core/update-app.service";
import {SettingService} from "./core/setting.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform:Platform, updateAppService:UpdateAppService,settingService:SettingService) {
    platform.ready().then(()=> {
      return updateAppService.fillDataId();
    }).then(()=>{
      settingService.initSetting();
    }).
    then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
