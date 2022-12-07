import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  UserEmail: string = "";

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
    this.UserEmail = "";
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  saveUser(address: String): Observable<any>{
    console.log(address)
    const payload = {email:this.UserEmail, password:address};
    return this.http.post<any>(`${this.authUrl}/setAddress`, payload, {headers: environment.headers});
  }

  getAddress(): Observable<any>{
    const payload = {email:this.UserEmail, password:""};
    return this.http.post<any>(`${this.authUrl}/getAddress`, payload, {headers: environment.headers});
  }
}
