import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  AUTH_SERVER_ADDRESS:  string  =  "https://localhost:5001";
  constructor(private http: HttpClient, private loginService: LoginService, private storage: Storage) { }

    async get(): Promise<Observable<any[]>> {
    var token = ''
    await this.storage.get("ACCESS_TOKEN").then((val)=>{
      token = val || '';
    });

    const headers = { 'content-type': 'application/json', "authorization": `Bearer ${token}`}   
    return this.http.get<any[]>(this.AUTH_SERVER_ADDRESS + '/api/Insumo', {"headers": headers}).pipe(
      
    );
  }
}
