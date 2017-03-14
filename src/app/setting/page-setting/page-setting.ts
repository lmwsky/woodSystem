import {Component, OnInit} from "@angular/core";
import {LoadingController, ToastController, AlertController, NavController, Loading} from "ionic-angular";
import {StorageService} from "../../core/storage.service";
import {Setting} from "../../core/setting";
import {SettingService} from "../../core/setting.service";
import {InitAppService} from "../../core/init-app.service";

/*
 Generated class for the PageSetting page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'page-setting.html'
})
export class SettingPage implements OnInit {
  private loading:Loading;

  setting:Setting;
  afterFirstInitSettingChange = false;

  constructor(public navCtrl:NavController,
              private settingService:SettingService,
              private storageService:StorageService,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private initAppService:InitAppService) {
  }

  ngOnInit():void {
    this.setting = this.settingService.getSetting();
  }

  specificationTypeChange() {
    if (!this.afterFirstInitSettingChange) {
      this.afterFirstInitSettingChange = true;
      return;
    }
    this.presentLoadingDefault("切换中...");
    this.settingService.changeSetting(this.setting)
      .then(()=>this.initAppService.resetApp())
      .then(()=> {
        this.hideLoadingDefault();
        this.presentToast("切换成功");
      });
  }

  clearDB():Promise<any> {
    this.presentLoadingDefault("清空数据中");
    return this.storageService.clearDB()
      .then(()=>this.initAppService.resetApp())
      .then(()=> {
        this.hideLoadingDefault();
        this.presentToast("清空数据成功");
      });
  }

  showConfirmClearDBAlert() {
    let alert = this.alertCtrl.create({
      title: '警告：清空数据确认',
      message: '你真的要清空所有数据么',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.clearDB().then(()=> {
              console.log("清空数据成功");
            });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log("取消清空数据成功");

          }
        }
      ]
    });
    alert.present();
  }

  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 500
    });
    toast.present();
  }

  presentLoadingDefault(hint:string) {
    this.loading = this.loadingCtrl.create({
      content: hint
    });
    this.loading.present();
  }

  hideLoadingDefault() {
    if (this.loading) {
      this.loading.dismissAll();
      this.loading = undefined;
    }
  }
}
