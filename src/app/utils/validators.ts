import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }
  
  static validPassword = (control:AbstractControl)=>{
      const value= control.value;
      if (!containsNumber(value)){
        return {invalid_password:true};
      }
      return null;
  }

  static matchPassword=(control:AbstractControl )=>{
    const password = control.get('password').value;
    const confirmPassword =control.get('confirmPassword').value;
    return (password===confirmPassword)?null:{match_password:true};
  }
  
}


const containsNumber = (value:string):boolean=>{
  return value.split('').find(v=>isNumber(v))!==undefined;
}

const isNumber = (value:string)=>{
  return !isNaN(parseInt(value,10));
}
