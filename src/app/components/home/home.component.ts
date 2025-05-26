import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MarvelService} from '../../services/marvel.service';
import { MarvelCharacter } from '../../services/marvel-character.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NgIf,
    FormsModule
  ]
})
export class HomeComponent implements OnInit {
  characters: MarvelCharacter[] = [];
  character: MarvelCharacter | undefined;
  userGuess: string = '';
  isCorrect: boolean | null = null;

  constructor(private apiService: ApiService, private marvelService: MarvelService) {}

  ngOnInit(): void {
    // this.apiService.getData().subscribe((response) => {
    //   this.data = response.data.results;
    //   this.selectRandomCharacter();
    // });

    this.marvelService.getCharacters().subscribe((response: MarvelCharacter[]) => {
      this.characters = response;
      this.character = this.selectRandomCharacter();
      }
    )

  }

  // Zufälligen Charakter auswählen
  selectRandomCharacter(): MarvelCharacter | undefined {
    if (this.characters.length > 0) {
      const random = Math.floor(Math.random() * this.characters.length)
      return this.characters[random];
    }
    return undefined;
  }

  // Überprüfen der Benutzereingabe
  checkGuess(): void {
    if (this.userGuess.toLowerCase() === this.character?.name.toLowerCase()) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

  // Zum nächsten Charakter skippen
  skipToNext(): void {
    this.character = this.selectRandomCharacter();
  }
}
