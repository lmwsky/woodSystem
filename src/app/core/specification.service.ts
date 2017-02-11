import {Specification} from "../shared/specification/specification.model";
import {Injectable} from "@angular/core";
/**
 * Created by isky on 2017/1/24.
 */

@Injectable()
export class SpecificationService {
  specificationList:Specification[]=[];

  constructor() {
    this.initSpecificationList();
  }

  initSpecificationList() {
    //todo read from sql

    let jsonArray = [
      {
        "id": 1,
        "name": "200*2*5",
        "volume": 0.002
      },
      {
        "id": 2,
        "name": "200*2*6",
        "volume": 0.0024
      },
      {
        "id": 3,
        "name": "200*2*8",
        "volume": 0.0032
      },
      {
        "id": 4,
        "name": "200*2*10",
        "volume": 0.004
      },
      {
        "id": 5,
        "name": "200*6*10",
        "volume": 0.012
      }
    ];

    for (let json of jsonArray) {
      let specification = new Specification(json.id, json.name, json.volume);
      this.specificationList.push(specification);
    }
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
