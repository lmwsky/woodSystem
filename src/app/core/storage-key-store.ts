import {Injectable} from "@angular/core";
import {SettingService} from "./setting.service";
/**
 * Created by isky on 2017/3/13.
 */
@Injectable()
export class StorageKeyStore {
  static TABLE_NAME_BUY_RECORD = "BuyRecordsTable";
  static TABLE_NAME_SELL_RECORD = "SellRecordListTable";
  static TABLE_NAME_STOCK_ITEMS = "stockTable";

  constructor(private settingService:SettingService) {

  }

  getKey(baseKeyName):string {
    if (this.settingService.isSpecificationTypeEqualToRound())
      return "round" + baseKeyName;
    else
      return baseKeyName;
  }
  getKeyForBuyRecord():string{
    return this.getKey(StorageKeyStore.TABLE_NAME_BUY_RECORD);
  }
  getKeyForSellRecord():string{
    return this.getKey(StorageKeyStore.TABLE_NAME_SELL_RECORD);
  }
  getKeyForStockItems():string{
    return this.getKey(StorageKeyStore.TABLE_NAME_STOCK_ITEMS);
  }
}
