import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/categories.model';
import { MaterialModule } from '../../../../material/material.module';

export interface CategoryItem{
  name:string;
  created_at:string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})


export class CategoriesComponent implements OnInit {
datos:Category[];
  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.getItems();
  }

getItems(){
    this.categoriesService.getAllCategories()
      .subscribe(data=>{
          console.log(data);
          this.datos=data;
      });
}

  displayedColumns: string[] = ['_id','name','image','actions'];
  // dataSource = this.datos;
}
