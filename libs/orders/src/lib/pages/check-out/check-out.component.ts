/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@shopsite/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { Subject, take, takeUntil } from 'rxjs';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'orders-check-out',
  templateUrl: './check-out.component.html',
  styles: [
  ]
})
export class CheckOutComponent implements OnInit,OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private stripeService: StripeService
  ) {}
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId?: string;
  countries : any = [];
  unsubcribe$ : Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
    this._autoFillUserData();
  }
   ngOnDestroy(){
   this.unsubcribe$.next;
   this.unsubcribe$.complete();
   }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFillUserData(){//observe current user data
this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubcribe$)).subscribe(user =>{
  if(user){
    this.userId = user.id;
  this.checkoutForm['name'].setValue(user.name);
  this.checkoutForm['email'].setValue(user.email);
  this.checkoutForm['phone'].setValue(user.phone);
  this.checkoutForm['city'].setValue(user.city);
  this.checkoutForm['country'].setValue(user.country);
  this.checkoutForm['zip'].setValue(user.zip);
  this.checkoutForm['apartment'].setValue(user.apartment);
  this.checkoutForm['street'].setValue(user.street);
  }
  

}
);
  }
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }
  private _getCartItems(){
    const cart:Cart = this.cartService.getCart(); //this cart imported from model
    this.orderItems  = cart.items?.map( item =>{
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    console.log("this.orderItems");
  }
  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true; //enable validation
    if (this.checkoutFormGroup.invalid) {
      return;
    }

   

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: Object.keys(ORDER_STATUS)[0], //0 or we can use it
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.ordersService.cacheOrderData(order);

    this.ordersService.createCheckoutSession(this.orderItems).subscribe(error =>{
      if(error){
           //do something
      }
    });

    // this.ordersService.createOrder(order).subscribe(
    //   ()=>{
    //   this.cartService.emptyCart();
    //   this.router.navigate(['/success']);
    // }, ()=>{

    // });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
