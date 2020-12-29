import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  logged=new Subject<boolean>();
  islog: boolean;
adminLogged=new Subject<boolean>();
 tokenStorageName: string = "userToken";
 constructor() { 
   this.changeloggedStatus(this.islogged());
 }

 setToken(token: string) {
   localStorage.setItem(this.tokenStorageName, token);
   this.changeloggedStatus(true);

 }

 getToken() {
   let token: string = localStorage.getItem("userToken");
   // alert("token"+token)
   if (token == null || token == 'undefined') {
    // this.islog = true;
     return "";
     
   }
   else
   { this.islog = false;
     return token;
   }
   
 }

 hasAccessToken(): boolean {
   return (localStorage.getItem("userToken") != null && localStorage.getItem("userToken").length > 0)
}
 removeToken() {
   
   localStorage.setItem(this.tokenStorageName, "");
   localStorage.removeItem(this.tokenStorageName);
   this.changeloggedStatus(false);
 }
 getLoggedStatus(){
   return this.logged.asObservable();
  }
changeloggedStatus(status:boolean)
{
 this.logged.next(status);

}


islogged():boolean {
 let token = localStorage.getItem("userToken");
 // alert("token"+token)
 if (token == null || token == '') {
   return false;
 }
 else
 return true;
}
}
