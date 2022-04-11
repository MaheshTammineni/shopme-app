/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {CategoriesService, Category} from '@shopsite/products';
import {ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'shopsite-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  constructor(
         private categoriesService: CategoriesService,
         private messageService: MessageService,
         private confirmationService: ConfirmationService,
         private router: Router
       ) {}

 
       ngOnInit(): void {
        this._getCategories();
      }
    
      deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
          message: 'Do you want to Delete this Category?',
          header: 'Delete Category',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.categoriesService.deleteCategory(categoryId).subscribe(
              () => {
                this._getCategories();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Category is deleted!'
                });
              },
              () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Category is not deleted!'
                });
              }
            );
          }
        });
      }
    
      updateCategory(categoryid: string) {
        this.router.navigateByUrl(`categories/form/${categoryid}`);
      }
    
      private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
          this.categories = cats;
        });
      }
}




// ngOnInit(): void {
//   this.categoriesService.getCategories().subscribe((res) => {
//     this.categories = res;
//   });
// }

// deleteCategory(categoryId : string){
//   this.categoriesService.deleteCategory(categoryId).subscribe(res => {

//   })
// }