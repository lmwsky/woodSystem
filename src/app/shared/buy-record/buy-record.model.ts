import {Specification} from "../specification/specification.model";
/**
 * Created by isky on 2017/1/23.
 */
export class BuyRecord {

  specification:Specification;

  constructor(public id:number,
              public specificationId:number,
              public singlePrice:number,
              public num:number,
              public computeSumPrice:number,
              public sumVolume:number,
              public actualSumPrice:number,
              public time:Date) {

  }

  setSpecification(specification:Specification) {
    this.specification = specification;
    this.specificationId=specification.id;
  }
}
