import {Specification} from "../shared/specification/specification.model";
import {Injectable} from "@angular/core";
import {SettingService} from "./setting.service";
/**
 * Created by isky on 2017/1/24.
 */

@Injectable()
export class SpecificationService {
  specificationList:Specification[] = [];

  constructor(private settingService:SettingService) {
  }

  initSpecificationList():Promise<any> {
    this.specificationList = [];
    let jsonArray:{id:number; name:string; volume:number}[];

    console.log("this.settingService.isSpecificationTypeEqualToSquare()= " + this.settingService.isSpecificationTypeEqualToSquare());
    if (this.settingService.isSpecificationTypeEqualToSquare()) {
      jsonArray = [
        {
          "id": 1,
          "name": "6x12x200",
          "volume": 0.0144
        },
        {
          "id": 2,
          "name": "6x10x200",
          "volume": 0.012
        },
        {
          "id": 3,
          "name": "6x9x200",
          "volume": 0.0108
        },
        {
          "id": 4,
          "name": "6x8x200",
          "volume": 0.0096
        },
        {
          "id": 5,
          "name": "6x6x200",
          "volume": 0.0072
        },
        {
          "id": 6,
          "name": "5x10x200",
          "volume": 0.01
        },
        {
          "id": 7,
          "name": "5x8x200",
          "volume": 0.008
        },
        {
          "id": 8,
          "name": "5x6x200",
          "volume": 0.006
        },
        {
          "id": 9,
          "name": "5x4x200",
          "volume": 0.004
        },
        {
          "id": 10,
          "name": "4x10x200",
          "volume": 0.008
        },
        {
          "id": 11,
          "name": "4x8x200",
          "volume": 0.0064
        },
        {
          "id": 12,
          "name": "4x6x200",
          "volume": 0.0048
        },
        {
          "id": 13,
          "name": "4.5x6x200",
          "volume": 0.0054
        },
        {
          "id": 14,
          "name": "4x4x200",
          "volume": 0.0032
        },
        {
          "id": 15,
          "name": "3x4x200",
          "volume": 0.0024
        },
        {
          "id": 16,
          "name": "2x3x200",
          "volume": 0.0012
        },
        {
          "id": 17,
          "name": "2x12x200",
          "volume": 0.00048
        },
        {
          "id": 18,
          "name": "2x10x200",
          "volume": 0.004
        },
        {
          "id": 19,
          "name": "2x8x200",
          "volume": 0.0032
        },
        {
          "id": 20,
          "name": "2x6x200",
          "volume": 0.0024
        },
        {
          "id": 21,
          "name": "1.2x10x200",
          "volume": 0.0024
        },
        {
          "id": 22,
          "name": "1.2x8x200",
          "volume": 0.00192
        },
        {
          "id": 23,
          "name": "1.2x6x200",
          "volume": 0.00144
        },
        {
          "id": 24,
          "name": "4x12x200",
          "volume": 0.0096
        }
      ];
    } else {
      jsonArray = [
        {
          "id": 1,
          "name": "4x200",
          "volume": 0.0041
        },
        {
          "id": 2,
          "name": "6x200",
          "volume": 0.0079
        }
      ];
    }


    for (let json of jsonArray) {
      let specification = new Specification(json.id, json.name, json.volume);
      this.specificationList.push(specification);
    }
    return Promise.resolve();
  }

  getSpecifications():Specification[] {
    return this.specificationList;
  }

  getSpecificationById(id:number):Specification {
    for (let specification of this.specificationList) {
      if (specification.id == id)
        return specification;
    }
    return undefined;
  }
}
