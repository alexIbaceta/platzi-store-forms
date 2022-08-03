import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  constructor( 
    private formBuiler:FormBuilder, 
    private categoriesService:CategoriesService, 
    private router:Router,
    private storage: AngularFireStorage
    ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
form: FormGroup;
avance:number=0;

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

save(event){
  if(this.form.valid){
      this.createCategory();
  }else{
    this.form.markAllAsTouched();
  }
}

private createCategory(){
  const data = this.form.value;
  this.categoriesService.createCategory(data)
  .subscribe(rta=>{
    console.log(rta);
      this.router.navigate(['./admin/categories/']);
  })
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
