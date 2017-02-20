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
    this.time=new Date(timeStr);
  }

  setSpecification(specification:Specification) {
    this.specification = specification;
    this.specificationId=specification.id;
  }
}
