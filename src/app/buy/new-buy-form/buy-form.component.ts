import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {StorageFactory} from "../../core/storage-factory";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'buy-form',
  templateUrl: 'buy-form.component.html'
})
export class BuyFormComponent implements OnInit {
  buyForm:FormGroup;
  buyRecord:BuyRecord;

  @Input()
  specifications:Specification[];
  @Output()
  submitEvent = new EventEmitter();

  constructor(private fb:FormBuilder) {
  }

  ngOnInit():void {
    this.initData();
    this.buildForm();
  }

  initData() {
    this.buyRecord = StorageFactory.createBuyRecord();
    if (this.specifications) {
      let selectedSpecification = this.specifications[0];
      this.buyRecord.setSpecification(selectedSpecification);
    }
  }
  buildForm():void {
    this.buyForm = this.fb.group({
      'time': [this.buyRecord.timeStr, [Validators.required]],
      'specification': [this.buyRecord.specification, [Validators.required]],
      'num': [this.buyRecord.num, [Validators.required]],
      'singlePrice': [this.buyRecord.singlePrice, [Validators.required]],
      'actualSumPrice': [this.buyRecord.actualSumPrice, [Validators.required]]

    });
    this.buyForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?:any) {
    console.log("form value change:");
    console.log(data);
    if (!this.buyForm) {
      return;
    }
    const form = this.buyForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    console.log("form value=");
    console.log(this.buyForm.value);

    //this.computeOtherValues();
  }

  formErrors = {
    'time': '',
    'specification': '',
    'num': '',
    'singlePrice': '',
    'actualSumPrice': ''
  };
  validationMessages = {
    'time': {
      'required': '必须选择时间',
    },
    'specification': {
      'required': '必须选择规格'
    },
    'num': {
      'required': '必须填写条数',
    },
    'singlePrice': {
      'required': '必须填写单价'
    },
    'actualSumPrice': {
      'required': '必须填写总价'
    }
  };
/*
  computeOtherValues(){
    this.buyRecord.computeSumPrice = this.buyRecord.num * this.buyRecord.singlePrice;
    this.buyRecord.sumVolume = this.buyRecord.num * this.buyRecord.specification.volume;
  }

  onSubmit() {
   
    if (this.buyRecord.specification)
      this.submitEvent.emit(this.buyRecord);

  }


  onChangeSpecification(specification:Specification) {
    this.buyRecord.setSpecification(specification);
    this.computeSumVolume();
  }

  onChangeDate(dateStr:string) {
    if (dateStr) {
      this.dateStr = dateStr;
      this.buyRecord.timeStr = dateStr;
      this.buyRecord.time = new Date(dateStr);
    }
  }

  onChangeSinglePrice(singlePrice:string) {
    this.buyRecord.singlePrice = Number.parseFloat(singlePrice);
    this.computeSumPrice();
    this.resetActualSumPrice();
  }

  onChangeNum(num:string) {
    this.buyRecord.num = Number.parseFloat(num);
    this.computeSumVolume();
    this.computeSumPrice();
    this.resetActualSumPrice()
  }
*/
}
