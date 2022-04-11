/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer} from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {
//we define observable by calling subject or behavior subject
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor(  //call services
  ) { }

  initCartLocalStorage(){
    const cart: Cart = this.getCart();
  if(!cart){
    const intialCart = {
      items: [] 
     };
     const intialCartJson = JSON.stringify(intialCart);
     localStorage.setItem(CART_KEY, intialCartJson);
  }   //else {                         //if there is cart then updated me with current cart
  //    this.cart$.next(cart);
  // }
 
  }
emptyCart(){
  const intialCart = {
    items: []
  };
  const intialCartJson = JSON.stringify(intialCart);
  localStorage.setItem(CART_KEY, intialCartJson);
  this.cart$.next(intialCart);
}

  getCart(): Cart{
    const cartJsonString : string = localStorage.getItem(CART_KEY)!;
    const cart : Cart = JSON.parse(cartJsonString);
    return cart;
  }
  setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart{
    // const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    const cart = this.getCart();
    const  cartItemExist = cart.items?.find((item)=> item.productId == cartItem.productId);

    if(cartItemExist){
        cart.items?.map( (item)=>{
          if(item.productId === cartItem.productId){
            if(updateCartItem){
              item.quantity = cartItem.quantity;
            }else{
              item.quantity = item.quantity + cartItem.quantity;
            }
          }
          return item;  //return items to map
        });
    }else{
      cart.items?.push(cartItem);
    }
    const CartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, CartJson);
    this.cart$.next(cart); //update the cart observable
    return cart;  // return updated cart
}

deleteCartItem(productId:string){
const cart = this.getCart();
const newCart = cart.items?.filter(item => item.productId !== productId);
cart.items = newCart;

const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);
    this.cart$.next(cart); //update the cart observable
}
}