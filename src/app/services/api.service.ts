// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import md5 from 'crypto-js/md5'; // MD5-Hash für den API-Request
//
// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private publicKey = '4845b8885eabf230dec8e2ec0782c263';
//   private apiUrl = 'https://gateway.marvel.com/v1/public/characters';
//
//   constructor(private http: HttpClient) {}
//
//   getData(): Observable<any> {
//     const ts = new Date().getTime().toString();
//
//     const privateKey = '89f43c0de22cfd2a2c1e38516f9677d56f84f16a';
//     const hash = md5(ts + privateKey + this.publicKey).toString();
//     const url = `${this.apiUrl}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
//
//     return this.http.get<any>(url);
//   }
// }
