import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount? : number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart =>{  //cart always observe every change happen to cartCount
      this.cartCount = cart.items?.length ?? 0; //if cart is defined then giveme th lengths of it
    })
  }

}
