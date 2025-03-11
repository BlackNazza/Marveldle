import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import md5 from 'crypto-js/md5'; // MD5-Hash für den API-Request

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private publicKey = '6590fe533225d3bbcb2ae8685cf1695b';
  private apiUrl = 'https://gateway.marvel.com/v1/public/characters';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const ts = new Date().getTime().toString();

    const privateKey = 'a927529eb60f85f6542f4ca8b9851d98d764ed49';
    const hash = md5(ts + privateKey + this.publicKey).toString();
    const url = `${this.apiUrl}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;

    return this.http.get<any>(url);
  }
}
