import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  form:FormGroup;

  constructor( private formBuilder:FormBuilder) {
    this.buildForm();
  }
  
  
  private buildForm(){
    this.form = this.formBuilder.group({
      name : ['', [Validators.required,Validators.maxLength(10)]],
      email : [],
      phone : ['',[Validators.required, Validators.maxLength(10)]],
      color : ['#000000'],
      date : [],
      age : [12],
      category : ['category-2'],
      tag : [''],
      agree : [false],
      gender : ['female'],
      zone: ['zona 3']
    })
    
  }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value=>{
        console.log(value);
    });

    this.form.valueChanges
      .subscribe(item=>{
        console.log(item);
      })
  }

  getNameValue(){
    console.log(this.nameField.value);
  }
  get isNameFieldValid(){
      return this.nameField.touched && this.nameField.valid;
  }
  
  get isNameFieldInValid(){
    return this.nameField.touched && this.nameField.invalid;
  }
  
  get isPhoneFieldInValid(){
    return this.phoneField.touched && this.phoneField.invalid;
  }
  
  get isPhoneFieldValid(){
      return this.phoneField.touched && this.phoneField.valid;
  }

  get nameField(){
    return this.form.get('name');
  }
  get emailField(){
    return this.form.get('email');
  }
  get phoneField(){
    return this.form.get('phone');
  }
  get colorField(){
    return this.form.get('color');
  }
  get dateField(){
    return this.form.get('date');
  }
  get ageField(){
    return this.form.get('age');
  }
  get categoryField(){
    return this.form.get('category');
  }
  get tagField(){
    return this.form.get('tag');
  }
  get agreeField(){
    return this.form.get('agree');
  }
  get genderField(){
    return this.form.get('gender');
  }
  get zoneField(){
    return this.form.get('zone');
  }

  save(event){
    if (this.form.valid){
      console.log(this.form.value);
    }else{
      this.form.markAllAsTouched();
    }
  }
}
