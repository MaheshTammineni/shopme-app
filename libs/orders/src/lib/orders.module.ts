import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@shopsite/users';
export const ordersRoutes: Routes[] = [];

const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckOutComponent
    },
    {
        path: 'success',
        component: ThankYouComponent
    }
]
@NgModule({
    imports: [CommonModule,ReactiveFormsModule,InputTextModule,DropdownModule,InputMaskModule,FormsModule,InputNumberModule,ButtonModule,BadgeModule, RouterModule.forChild(routes)],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckOutComponent,
      ThankYouComponent
    ],
    exports: [
      CartIconComponent,
      CartPageComponent,
    
      OrderSummaryComponent,
           ThankYouComponent
    ]
})
export class OrdersModule {
    constructor(cartService: CartService){
          cartService.initCartLocalStorage();
    }
}
