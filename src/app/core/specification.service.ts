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
    this.specificationList.splice(0, this.specificationList.length);
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
        },
        {
          "id": 3,
          "name": "8x200",
          "volume": 0.013
        },
        {
          "id": 4,
          "name": "10x200",
          "volume": 0.019
        },
        {
          "id": 5,
          "name": "12x200",
          "volume": 0.027
        },
        {
          "id": 6,
          "name": "14x200",
          "volume": 0.036
        },
        {
          "id": 7,
          "name": "16x200",
          "volume": 0.047
        },
        {
          "id": 8,
          "name": "18x200",
          "volume": 0.059
        },
        {
          "id": 9,
          "name": "20x200",
          "volume": 0.072
        },
        {
          "id": 10,
          "name": "22x200",
          "volume": 0.086
        },
        {
          "id": 11,
          "name": "24x200",
          "volume": 0.102
        },
        {
          "id": 12,
          "name": "26x200",
          "volume": 0.12
        },
        {
          "id": 13,
          "name": "28x200",
          "volume": 0.138
        },
        {
          "id": 14,
          "name": "30x200",
          "volume": 0.158
        },
        {
          "id": 15,
          "name": "32x200",
          "volume": 0.18
        },
        {
          "id": 16,
          "name": "34x200",
          "volume": 0.202
        },
        {
          "id": 17,
          "name": "36x200",
          "volume": 0.226
        },
        {
          "id": 18,
          "name": "38x200",
          "volume": 0.252
        },
        {
          "id": 19,
          "name": "40x200",
          "volume": 0.278
        },
        {
          "id": 20,
          "name": "4x220",
          "volume": 0.0047
        },
        {
          "id": 21,
          "name": "6x220",
          "volume": 0.0089
        },
        {
          "id": 22,
          "name": "8x220",
          "volume": 0.015
        },
        {
          "id": 23,
          "name": "10x220",
          "volume": 0.022
        },
        {
          "id": 24,
          "name": "12x220",
          "volume": 0.03
        },
        {
          "id": 25,
          "name": "14x220",
          "volume": 0.04
        },
        {
          "id": 26,
          "name": "16x220",
          "volume": 0.052
        },
        {
          "id": 27,
          "name": "18x220",
          "volume": 0.065
        },
        {
          "id": 28,
          "name": "20x220",
          "volume": 0.08
        },
        {
          "id": 29,
          "name": "22x220",
          "volume": 0.096
        },
        {
          "id": 30,
          "name": "24x220",
          "volume": 0.114
        },
        {
          "id": 31,
          "name": "26x220",
          "volume": 0.133
        },
        {
          "id": 32,
          "name": "28x220",
          "volume": 0.154
        },
        {
          "id": 33,
          "name": "30x220",
          "volume": 0.176
        },
        {
          "id": 34,
          "name": "32x220",
          "volume": 0.199
        },
        {
          "id": 35,
          "name": "34x220",
          "volume": 0.224
        },
        {
          "id": 36,
          "name": "36x220",
          "volume": 0.251
        },
        {
          "id": 37,
          "name": "38x220",
          "volume": 0.279
        },
        {
          "id": 38,
          "name": "40x220",
          "volume": 0.309
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
