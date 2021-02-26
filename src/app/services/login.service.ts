import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { Usuario } from  '../stockLab/models/usuario';
import { AuthResponse } from  '../stockLab/models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:5001';
  authSubject  =  new  BehaviorSubject(false);
  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  register(user: Usuario): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.usuario) {
          await this.storage.set("ACCESS_TOKEN", res.usuario.token);
          await this.storage.set("EXPIRES_IN", res.usuario.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: Usuario): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.usuario) {
          await this.storage.set("ACCESS_TOKEN", res.usuario.token);
          await this.storage.set("EXPIRES_IN", res.usuario.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
