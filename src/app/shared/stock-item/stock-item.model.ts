import {Specification} from "../specification/specification.model";
/**
 * Created by isky on 2017/1/23.
 */
export class StockItem {

  specification:Specification;

  constructor(public id:number,
              public specificationId:number,
              public num:number) {
  }

  setSpecification(specification:Specification) {
    this.specification = specification;
    this.specificationId = specification.id;
  }

  getSumVolume():number {
    if (this.specification) {
      return this.num * this.specification.volume;
    } else {
      return 0;
    }
  }
}
