import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  form:FormGroup;
  
  categorias=[
    {name:'Categoria 1', valor:'categoty-1'},
    {name:'Categoria 2', valor:'categoty-2'},
    {name:'Categoria 3', valor:'categoty-3'},
    {name:'Categoria 4', valor:'categoty-4'},
    {name:'Categoria 5', valor:'categoty-5'}];
  
  categoriaSelec=this.categorias[3].valor;
  genderSelect:'other';
  constructor( private formBuilder:FormBuilder) {
    this.buildForm();
  }
  
  
  private buildForm(){
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name : ['', [Validators.required,Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        last: ['', [Validators.required,Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      email : ['',[Validators.required, Validators.email]],
      phone : ['',[Validators.required, Validators.maxLength(10)]],
      color : ['#000000'],
      date : [],
      age : [18, [Validators.required,  Validators.min(18), Validators.max(100)]],
      category : [this.categoriaSelec],
      tag : [''],
      agree : [false, [Validators.requiredTrue]],
      gender : ['female'],
      zone: ['zona 3']
    })
    
  }

    

  ngOnInit(): void {
    // this.nameField.valueChanges
    // .subscribe(value=>{
    //     console.log(value);
    // });

    // this.form.valueChanges
    //   .subscribe(item=>{
    //     console.log(item);
    //   })
  }

  getNameValue(){
    console.log(this.nameField.value);
  }
    get nameField(){
      return this.form.get('fullName.name');
    }
    get lastField(){
      return this.form.get('fullName.last');
    }

    get isNameFieldValid(){
      return this.nameField.touched && this.nameField.valid;
    }

    get isLastFieldValid(){
      return this.lastField.touched && this.lastField.valid;
    }
    
    get isNameFieldInValid(){
      return this.nameField.touched && this.nameField.invalid;
    }

    get isLastFieldInValid(){
      return this.lastField.touched && this.lastField.invalid;
    }
    
    get isPhoneFieldInValid(){
      return this.phoneField.touched && this.phoneField.invalid;
    }
    
    get isPhoneFieldValid(){
      return this.phoneField.touched && this.phoneField.valid;
    }
    
    get emailField(){
      return this.form.get('email');
    }
    get isEmailFieldInValid(){
      return this.emailField.touched && this.emailField.invalid;
    }
    
    get isEmailFieldValid(){
      return this.emailField.touched && this.emailField.valid;
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
  
  get isAgeFieldInValid(){
    return this.ageField.touched && this.ageField.invalid;
  }

  get isAgeFieldValid(){
    return this.ageField.touched && this.ageField.valid;
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

  get isAgreeFieldInValid(){
    return this.agreeField.touched && this.agreeField.invalid;
  }

  get isAgreeFieldValid(){
    return this.agreeField.touched && this.agreeField.valid;
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
