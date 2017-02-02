import {Specification} from "../shared/specification/specification.model";
import {Injectable} from "@angular/core";
/**
 * Created by isky on 2017/1/24.
 */

@Injectable()
export class SpecificationService {
  specificationList:Specification[];

   constructor() {
   //todo read from sql
   this.specificationList = [
   new Specification(1, "2*6*10", 0.12),
   new Specification(2, "2*7*10", 0.14),
   new Specification(3, "2*8*10", 0.16)
   ];
   }

   getSpecifications():Promise<Specification[]> {
   return Promise.resolve(this.specificationList);
   }

   getSpecificationById(id:number):Specification {
   for (let specification of this.specificationList) {
   if (specification.id == id)
   return specification;
   }
   return undefined;
   }
}
