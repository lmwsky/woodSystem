import {StorageCollection} from "../core/storage-collection";
import {BuyRecord} from "./buy-record/buy-record.model";
import {SellRecord} from "./sell-record/sell-record.model";
/**
 * Created by isky on 2017/2/21.
 */
export class StatisticsUtil {
  static countSpecificationNum(collection:StorageCollection<BuyRecord|SellRecord>):number {
    
    let specificationList = []
    let specificationNum = 0;
    for (let item of collection.data) {
      let isRepeat = false;
      for (let specification of specificationList) {
        if (specification == item.specificationId) {
          isRepeat = true;
          break;
        }
      }
      if (isRepeat == false) {
        specificationNum++;
        specificationList.push(item.specificationId);
      }
    }
    return specificationNum;
    
  }

  static countSumVolume(collection:StorageCollection<BuyRecord|SellRecord>):number {

    let sumVolume = 0;
    for (let item of collection.data) {
      sumVolume += item.sumVolume;
    }
    return sumVolume;
  }
  static countSumPrice(collection:StorageCollection<BuyRecord|SellRecord>):number {

    let sumPrice = 0;
    for (let item of collection.data) {
      sumPrice += item.actualSumPrice;
    }
    return sumPrice;
  }
}
