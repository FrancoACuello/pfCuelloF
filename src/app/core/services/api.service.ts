import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
    private urlApi = 'https://one-piece2.p.rapidapi.com/v2/getAllCharacters';
  
    constructor(private http: HttpClient) {}
  
    public getData(): Observable<any> {
      return this.http.get<any>(this.urlApi, {
        headers: {
          'token': 'ab84ad27eb9fe47b625069a7f0a4833fb92439639d9a57f7a56ca60bc4a8fbc6',
          'X-RapidAPI-Key': '43a444bac8msh2e4a9bb598403a8p15c6f8jsncd4803b449f2',
          'X-RapidAPI-Host': 'one-piece2.p.rapidapi.com'
        }
      });
    }
  }