/**
 * Created by isky on 2017/2/28.
 */
import {ValidatorFn, AbstractControl} from "@angular/forms";
import {StockService} from "../../core/stock.service";

export function biggerThan(minValue:number):ValidatorFn {
  return (control:AbstractControl):{[key:string]:any} => {
    const value = control.value;
    return value <= minValue ? {biggerThan: {valid: false}} : null;
  };
}
export function biggerThanZero():ValidatorFn {
  return (control:AbstractControl):{[key:string]:any} => {
    const value = control.value;
    return value <= 0 ? {biggerThanZero: {valid: false}} : null;
  };
}
