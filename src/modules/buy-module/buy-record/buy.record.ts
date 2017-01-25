/**
 * Created by isky on 2017/1/23.
 */
export class BuyRecord{

  constructor(
    public id:number,
    public speficationId:number,
    public singlePrice:number,
    public num:number,
    public computeSumPrice:number,
    public sumVolume:number,
    public actualSumPrice:number,
    public time:Date
  ){

  }
}
