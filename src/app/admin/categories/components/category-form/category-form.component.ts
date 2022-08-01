import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  constructor( private formBuiler:FormBuilder) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
form: FormGroup;

private buildForm(){
  this.form=this.formBuiler.group({
  name:['',[Validators.required]],
  image:['',[Validators.required]]
  })
}

get nameField(){
  return this.form.get('name');
}

get imageField(){
  return this.form.get('image');
}

}
