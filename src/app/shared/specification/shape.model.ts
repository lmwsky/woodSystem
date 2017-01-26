/**
 * Created by isky on 2017/1/23.
 */
interface Shape{
  getVolume():number;
  toString():string;
}

export class Cuboid implements Shape{
  volume:number;
  constructor(public length:number,public width:number,public height:number){
    this.volume=this.length*this.width*this.height;
  }
  getVolume():number {
    return this.volume;
  }
  toString():string{
    return this.length+" x "+this.width+" x "+this.height;
  }
}
export class Cylinder implements Shape{
  volume:number;
  constructor(public radius:number,public height:number,volume:number){
      if(this.volume==undefined)
        this.volume=3.1415926*this.radius*this.radius*this.height;
  }
  getVolume():number {
    return this.volume;
  }
  toString():string{
    return this.radius+" x "+this.height;
  }
}
