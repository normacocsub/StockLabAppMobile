import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { Usuario } from  '../stockLab/models/usuario';
import { AuthResponse } from  '../stockLab/models/auth-response';

const httpOptionsPut = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "authorization": "Bearer " + "2" 
  }), responseType: "text",
};

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  token = '';
  private currentUserSubject: BehaviorSubject<AuthResponse>;
  AUTH_SERVER_ADDRESS:  string  =  "https://localhost:5001";
  authSubject  =   new  BehaviorSubject(false);
  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { 
    this.storage.get("ACCESS_USER").then((val) =>{
      if(val != null){
        this.authSubject.next(true);
      }
      else{
        this.authSubject  =   new  BehaviorSubject(false);
      }
    })
  }

  register(user: Usuario): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/login`, user ).pipe(
      tap(async (res:  AuthResponse ) => {
        
        if (res.usuario) {
          await this.storage.set("ACCESS_TOKEN", res.token);
          await this.storage.set("EXPIRES_IN", res.tokenExpire);
          await this.storage.set("ACCESS_USER",res.usuario);
          this.authSubject.next(true);
        }

      })

    );
  }

  async login(user: Usuario): Promise<Observable<AuthResponse>> {
    
    await this.storage.get("ACCESS_TOKEN").then((val)=>{
      this.token = val || '';
    });

    const headers = { 'content-type': 'application/json', "authorization": `"Bearer ${this.token}"`}   
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/login`, user, {'headers': headers} ).pipe(
      tap(async (res: AuthResponse) => {
        if (res.usuario) {
          await this.storage.set("ACCESS_TOKEN", res.token);
          await this.storage.set("EXPIRES_IN", res.tokenExpire);
          await this.storage.set("ACCESS_USER",res.usuario);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    await this.storage.remove("ACCESS_USER");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

    async currentUserValue() {
    var user = {
      usuario: "",
      token: ""
    }
    await this.storage.get("ACCESS_TOKEN").then((val)=>{
      this.token = val || '';
    });

    await this.storage.get("ACCESS_USER").then((val)=>{
      user.usuario = val || '';
    });

    return this.token;
  }
}
