import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarvelCharacter } from './marvel-character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private url = 'marvel_characters.json';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<MarvelCharacter[]> {
    return this.http.get<MarvelCharacter[]>(this.url);
  }
}
