import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Specification} from "../../shared/specification/specification.model";
import {StorageFactory} from "../../core/storage-factory";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {biggerThanZero} from "../../shared/validators/validators";
import {SellRecord} from "../../shared/sell-record/sell-record.model";
import {StockService} from "../../core/stock.service";

/*
 Generated class for the PageNewBuy page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'sell-form',
  templateUrl: 'sell-form.component.html'
})
export class SellFormComponent implements OnInit {
  sellForm:FormGroup;
  sellRecord:SellRecord;

  @Input()
  specifications:Specification[];
  @Output()
  submitEvent = new EventEmitter();
  stockItemNum:number = 0;

  constructor(private fb:FormBuilder, public stockService:StockService) {
  }

  ngOnInit():void {
    this.init();
  }

  init(defaultSellRecord:SellRecord = undefined) {
    this.initData(defaultSellRecord);
    this.buildForm();
    this.updateStockItem(this.sellRecord.specification);
  }

  initData(defaultSellRecord:SellRecord = undefined) {
    this.sellRecord = StorageFactory.createSellRecord();
    if (this.specifications) {
      let selectSpecification = this.specifications[0];
      this.sellRecord.setSpecification(selectSpecification);
    }
    if (defaultSellRecord) {
      this.sellRecord.setTimeStr(defaultSellRecord.timeStr);
      this.sellRecord.buyer = defaultSellRecord.buyer;
    }
  }

  buildForm():void {
    this.sellForm = this.fb.group({
      'timeStr': [this.sellRecord.timeStr, [Validators.required]],
      'specification': [this.sellRecord.specification, [Validators.required]],
      'num': [this.sellRecord.num, [Validators.required, biggerThanZero()]],
      'singlePrice': [this.sellRecord.singlePrice, [Validators.required, biggerThanZero()]],
      'buyer': [this.sellRecord.buyer, [Validators.required]],
      'actualSumPrice': [this.sellRecord.actualSumPrice, [Validators.required]]
    });
    this.sellForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?:any) {
    if (!this.sellForm) {
      return;
    }
    let isError = false;
    const form = this.sellForm;

    this.sellRecord.setSpecification(form.value.specification);
    this.updateStockItem(this.sellRecord.specification);

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
      this.sellRecord.updateValue(form.value);
      form.value.actualSumPrice = this.sellRecord.actualSumPrice;
    }
  }

  formErrors = {
    'timeStr': '',
    'specification': '',
    'num': '',
    'singlePrice': '',
    'actualSumPrice': '',
    'buyer': ''
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
      'biggerThanZero': '条数必须大于0',
      'lack': '库存不足'
    },
    'singlePrice': {
      'required': '必须填写单价',
      'biggerThanZero': '单价必须大于0'
    },
    'actualSumPrice': {
      'required': '必须填写总价'
    },
    'buyer': {
      'required': '必须填写买家'
    }
  };


  onSubmit() {
    this.updateStockItem(this.sellRecord.specification).then(()=> {
      if (this.sellRecord.num <= this.stockItemNum) {
        this.submitEvent.emit(this.sellRecord);
        this.init(this.sellRecord);
      } else {
        this.formErrors['num'] = this.validationMessages['num']['lack'];
      }
    })
  }

  updateStockItem(specification:Specification):Promise<any> {
    return this.stockService.getStockItemBySpecification(specification.id).then((stockItem)=> {
      if (stockItem) {
        this.stockItemNum = stockItem.num;
      } else {
        this.stockItemNum = 0;
      }
    });
  }
}
