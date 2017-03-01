import {Specification} from "../specification/specification.model";
/**
 * Created by isky on 2017/1/23.
 */
export class SellRecord {

  specification:Specification;
  time:Date;

  constructor(public id:number,
              public specificationId:number,
              public singlePrice:number,
              public num:number,
              public computeSumPrice:number,
              public sumVolume:number,
              public actualSumPrice:number,
              public timeStr:string,
              public buyer:string) {
    this.time = new Date(timeStr);
  }

  setSpecification(specification:Specification) {
    this.specification = specification;
    this.specificationId = specification.id;
  }

  computeOtherValues() {
    this.computeSumPrice = this.num * this.singlePrice;
    this.sumVolume = this.num * this.specification.volume;
  }

  setTimeStr(timeStr:string) {
    this.timeStr = timeStr;
    this.time = new Date(timeStr);
  }

  updateValue(value:any) {
    this.setTimeStr(value.timeStr);
    this.setSpecification(value.specification);
    this.num = Number.parseFloat(value.num + "");
    this.singlePrice = Number.parseFloat(value.singlePrice + "");
    this.actualSumPrice = Number.parseFloat(value.actualSumPrice + "");
    this.buyer = value.buyer;
    this.computeOtherValues();
  }
}
