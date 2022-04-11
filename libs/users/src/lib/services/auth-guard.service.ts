/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})  //canActivate is angular router, which is always observing router to allow or not to new route
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}
//this method accept the route which will be state and snapshot
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {   //decoding the token
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    }   

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration:any): boolean { //timestamp  here we did with venalla js but we can also use library of momentjs.
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
