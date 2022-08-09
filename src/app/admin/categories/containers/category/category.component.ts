import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../../core/services/categories.service';
import { FormGroup } from '@angular/forms';
import { Category } from '../../../../core/models/categories.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
categoryId:string;
form:FormGroup;
category:Category;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoriesService:CategoriesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
        if(params.id){
          this.getCategory(params.id);
        }
    })
  }

  createCategory(data){
    this.categoriesService.createCategory(data)
    .subscribe(rta=>{
      console.log(rta);
        this.router.navigate(['./admin/categories/']);
    })
  }
  
  updateCategory(data){
    this.categoriesService.updateCategory(this.category._id, data)
    .subscribe(rta=>{
      console.log(rta);
        this.router.navigate(['./admin/categories/']);
    })
  }
  
  
  
  private getCategory(id:string){
    this.categoriesService.getCategory(id)
    .subscribe(data=>{
      this.category=data;
      // console.log(rta);
        // this.form.patchValue(rta);
        // this.nameField.setValue(rta.name);
        // this.imageField.setValue(rta.image);
    })
  }


}
