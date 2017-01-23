import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Specification} from "../../model/Specification";
import {BuyRecord} from "../../model/BuyRecord";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-buy',
  templateUrl: 'page-new-buy.html'
})
export class PageNewBuyPage {
  specifications:Specification[] = [
    new Specification(1, "2*6*10", 0.12),
    new Specification(2, "2*7*10", 0.14),
    new Specification(3, "2*8*10", 0.16)
  ];
  selectedSpecification:Specification = this.specifications[0];

  newBuyRecord:BuyRecord = new BuyRecord(0, 0, 0, 0, 0, 0, 0, new Date());

  constructor(public navCtrl:NavController, public navParams:NavParams) {
    this.selectedSpecification = this.specifications[0];

  }
  computeSumPrice(){
    this.newBuyRecord.computeSumPrice=this.newBuyRecord.num*this.newBuyRecord.singlePrice;
    this.newBuyRecord.actualSumPrice=this.newBuyRecord.computeSumPrice;

  }
  computeSumVolume(){
    this.newBuyRecord.sumVolume=this.newBuyRecord.num*this.selectedSpecification.volume;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PageNewBuyPage');
  }
  onSubmit(){
    console.log('submit the form!');
    console.log(this.newBuyRecord);
  }

}
