/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Injectable } from '@angular/core';

// const TOKEN = 'jwtToken';

// @Injectable({
//   providedIn: 'root'
// })
// export class LocalstorageService {
  
//   getUser(userId: any, string: any) {
//       throw new Error('Method not implemented.');
//   }

//   setToken(data:any) {
//     localStorage.setItem(TOKEN, data);
//   }

//   getToken(): any {
//     return localStorage.getItem(TOKEN);
//   }

//   removeToken() {
//     localStorage.removeItem(TOKEN);
//   }

//   isValidToken(){
//     const token = this.getToken();
//     if(token){
//       const tokenDecode = JSON.parse(atob(token.split('.')[1]));
//       return !this._tokenExpired(tokenDecode.exp);
//     } else {
//       return false;
//     }
//   }

//   getUserIdFromToken(){
//     const token = this.getToken();
//     if(token){
//       const tokenDecode = JSON.parse(atob(token.split('.')[1]));
//       if(tokenDecode){
//         return tokenDecode.userId;
//       }else {
//         return  null;
//       }
//     } else {
//       return null;
//     }
//   }
//   private _tokenExpired(expiration:any): boolean { //timestamp  here we did with venalla js but we can also use library of momentjs.
//     return Math.floor(new Date().getTime() / 1000) >= expiration;
//   }
// }


import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  setToken(data:any) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): any{
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private _tokenExpired(expiration:any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}