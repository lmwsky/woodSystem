import {Specification} from "./Specification";
import {Injectable} from "@angular/core";
/**
 * Created by isky on 2017/1/24.
 */

@Injectable()
export class SpecificationService {
  constructor(){
    
  }
  getSpecications() {
    return [
      new Specification(1, "2*6*10", 0.12),
      new Specification(2, "2*7*10", 0.14),
      new Specification(3, "2*8*10", 0.16)
    ];
  }
}
