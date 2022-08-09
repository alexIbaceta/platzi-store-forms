import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MyValidators } from '../../../../utils/validators';
import { Category } from '../../../../core/models/categories.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  avance:number=0;
  isNew:boolean=true;

  @Input()
  set category(data:Category){
    if(data){
      this.isNew=false;
      this.form.patchValue(data);
    }
  }
  @Output() create = new EventEmitter();
  @Output() update= new EventEmitter();
  // categoryId:string;

  constructor( 
    private formBuiler:FormBuilder, 
    private storage: AngularFireStorage,
    private categoriesService:CategoriesService
    ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

private buildForm(){
  this.form=this.formBuiler.group({
  name:['',[Validators.required, Validators.minLength(4)],[MyValidators.validateCategory(this.categoriesService)]],
  image:['',[Validators.required]]
  })
}

get nameField(){
  return this.form.get('name');
}

get imageField(){
  return this.form.get('image');
}

save(event){
  console.log('save');
  if(this.form.valid){
    if (this.isNew){
      this.create.emit(this.form.value);
    }else{
      this.update.emit(this.form.value);
    }
  }else{
    this.form.markAllAsTouched();
  }
}

uploadFile(event){
  const image = event.target.files[0];
  const name = 'category.png';
  const ref = this.storage.ref(name);
  const task = this.storage.upload(name, image);
  // console.log(task.percentageChanges());
  task.percentageChanges()
  .subscribe(numero=>{
    this.avance=numero;
    console.log(numero);
  })
  task.snapshotChanges()
  .pipe(
    finalize(()=>{
      const urlImage$=ref.getDownloadURL();
      urlImage$.subscribe(url=>{
        console.log(url);
        this.imageField.setValue(url);
      })
    })
  )
  .subscribe();
}


}
