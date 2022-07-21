import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  nameField = new FormControl('', [Validators.required,Validators.maxLength(10)]);
  emailField = new FormControl();
  phoneField = new FormControl();
  colorField = new FormControl('#000000');
  dateField = new FormControl();
  ageField = new FormControl(12);
  categoryField = new FormControl('category-2');
  tagField = new FormControl('');
  agreeField = new FormControl(true);
  genderField = new FormControl('female');
  zoneField= new FormControl('zona 3');
  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value=>{
        console.log(value);
    });
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



}
