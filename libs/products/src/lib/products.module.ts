import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule , Routes} from '@angular/router';
import { OrdersModule } from '@shopsite/orders';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {RatingModule} from 'primeng/rating';
import { UiModule } from '@shopsite/ui';
import { ProductPageComponent } from './pages/product-page/product-page.component';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent
  }
]
@NgModule({
    imports: [CommonModule,OrdersModule,RatingModule,UiModule,InputNumberModule,FormsModule,ButtonModule,RouterModule.forChild(routes),OrdersModule,CheckboxModule],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      ProductPageComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductItemComponent
    ],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductPageComponent,ProductsListComponent],
})
export class ProductsModule {}
