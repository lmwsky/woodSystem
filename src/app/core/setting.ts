/**
 * Created by isky on 2017/3/13.
 */
export class Setting{
  static SHAPE_SQUARE = "square";
  static SHAPE_ROUND = "round";
  
  constructor(public specificationType:string=Setting.SHAPE_SQUARE){
    
  }
}
