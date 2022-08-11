import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from '../../../../core/models/categories.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  categories:Category[]=[];
  states=[
    {name:'Arizona',abbrev:'AZ'},
    {name:'California',abbrev:'CA'},
    {name:'Colorado',abbrev:'CO'},
    {name:'New York',abbrev:'NY'},
    {name:'Pennsylvania',abbrev:'PA'}
  ];


  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService:CategoriesService

  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue({...product, state:this.states[3]});
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product);
      // this.productsService.updateProduct(this.id, product)
      // .subscribe((newProduct) => {
      //   console.log(newProduct);
      //   this.router.navigate(['./admin/products']);
      // });
    }
  }

  private getCategories(){
      this.categoriesService.getAllCategories()
      .subscribe(data=>{
        this.categories=data;
      })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      state:['',[Validators.required]]
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  get nameField() {
    return this.form.get('name');
  }
  
  get descriptionField() {
    return this.form.get('description');
  }
  get categoryField() {
    return this.form.get('category_id');
  }

  get stateField(){
    return this.form.get('state');
  }

}
