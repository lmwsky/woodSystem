import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {BuyRecord} from "../../shared/buy-record/buy-record.model";
import {StorageFactory} from "../../core/storage-factory";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {biggerThanZero} from "../../shared/validators/validators";

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
    this.init();
  }

  /**
   * init the data and form, some values are used the given default data
   * @param lastBuyRecord the default value template,ect,the time is the same as the lastBuyRecord
   */
  init(lastBuyRecord:BuyRecord = undefined) {
    this.initData(lastBuyRecord);
    this.buildForm();
  }

  initData(lastBuyRecord:BuyRecord = undefined) {
    this.buyRecord = StorageFactory.createBuyRecord();
    if (this.specifications) {
      let selectedSpecification = this.specifications[0];
      this.buyRecord.setSpecification(selectedSpecification);
    }
    if (lastBuyRecord) {
      this.buyRecord.setTimeStr(lastBuyRecord.timeStr);
    }
    console.log("last");
    console.log(lastBuyRecord);
    console.log("new");
    console.log(this.buyRecord);
  }

  buildForm():void {
    this.buyForm = this.fb.group({
      'timeStr': [this.buyRecord.timeStr, [Validators.required]],
      'specification': [this.buyRecord.specification, [Validators.required]],
      'num': [this.buyRecord.num,
        [Validators.required,
          biggerThanZero()]],
      'singlePrice': [this.buyRecord.singlePrice, [Validators.required]],
    });
    this.buyForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?:any) {
    if (!this.buyForm) {
      return;
    }
    let isError = false;
    const form = this.buyForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        isError = true;
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    if (!isError) {
      this.buyRecord.updateValue(form.value);
    }
  }

  formErrors = {
    'timeStr': '',
    'specification': '',
    'num': '',
    'singlePrice': '',
    'actualSumPrice': ''
  };
  validationMessages = {
    'timeStr': {
      'required': '必须选择时间',
    },
    'specification': {
      'required': '必须选择规格'
    },
    'num': {
      'required': '必须填写条数',
      'biggerThanZero': '条数必须大于0'
    },
    'singlePrice': {
      'required': '必须填写单价'
    },
    'actualSumPrice': {
      'required': '必须填写总价'
    }
  };

  onSubmit() {
    this.submitEvent.emit(this.buyRecord);
    this.init(this.buyRecord);
  }


}
