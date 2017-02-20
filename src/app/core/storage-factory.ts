import {BuyRecord} from "../shared/buy-record/buy-record.model";
import {SellRecord} from "../shared/sell-record/sell-record.model";
/**
 * Created by isky on 2017/2/19.
 */
export class StorageFactory {
  static createBuyRecord():BuyRecord {
    return new BuyRecord(0, 0, 0, 0, 0, 0, 0, new Date().toLocaleDateString());
  }

  static createSellRecord():SellRecord {
    return new SellRecord(0, 0, 0, 0, 0, 0, 0, new Date().toLocaleDateString(), "老板");
  }
}
