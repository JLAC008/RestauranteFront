import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { appsettings } from '../../../settings/appsettings';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = appsettings.apiUrl;
  private LOGIN_URL = this.baseUrl+"auth/login";
  private tokenKey = 'authToken'
  constructor(private httpClient: HttpClient, private router:Router) { }

  login(username:string, password:string, fcmToken:string ): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {username,password,fcmToken}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
        }
      })
    )
  }

  private setToken(token:string):void{
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated():boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout():void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

}
