/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@shopsite/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'shopsite-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
   editmode = false;
   currentCategoryId!: string; //beginning null
  
  

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required], //Validators.required is a property
      icon: ['', Validators.required],
      color: ['#fff']  //default value
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
     id: this.currentCategoryId,
     name: this.categoryForm['name'].value,
     icon: this.categoryForm['icon'].value,
     color: this.categoryForm['color'].value
    };
      this.categoriesService.createCategory(category);

   if (this.editmode) {
     this._updateCategory(category);
   } else {
     this._addCategory(category);
   }   
 }

 onCancle() {
   this.location.back();
 }

 private _addCategory(category: Category) { //accept category data
   this.categoriesService.createCategory(category).subscribe(
     (category: Category) => {
       this.messageService.add({
         severity: 'success',
         summary: 'Success',
         detail: `Category ${category.name} is created!`
       });
       timer(2000)
         .toPromise()
         .then(done => {
           this.location.back();
         });
     },
     () => {
       this.messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: 'Category is not created!'
       });
     }
   );
 }

 private _updateCategory(category: Category) {
   this.categoriesService.updateCategory(category).subscribe(
     (category: Category) => {
       this.messageService.add({
         severity: 'success',
         summary: 'Success',
         detail: `Category ${category.name} is updated!`
       });
       timer(2000)
         .toPromise()
         .then(() => {
           this.location.back();
         });
     },
     () => {
       this.messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: 'Category is not updated!'
       });
     }
   );
 }

 private _checkEditMode() {  //internal flag as private
   this.route.params.subscribe((params) => {  //check parameters in current url
     if (params['id']) { 
       this.editmode = true;
       this.currentCategoryId = params['id'];
       this.categoriesService.getCategory(params['id']).subscribe(category => {
         this.categoryForm['name'].setValue(category.name);
         this.categoryForm['icon'].setValue(category.icon);
         this.categoryForm['color'].setValue(category.color);
       });
     }   
   });
 }
 get categoryForm(){
  return this.form.controls;
 }

}




    