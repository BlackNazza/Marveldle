import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {KeyValuePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MarvelService} from '../../services/marvel.service';
import {MarvelCharacter} from '../../services/marvel-character.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, NgForOf, KeyValuePipe]
})
export class HomeComponent implements OnInit {
  // Beispiel in der Component:
  characters: MarvelCharacter[] = [];
  suggestions: MarvelCharacter[] = [];
  correctCharacter!: MarvelCharacter;
  charactersGuess: MarvelCharacter[] = [];
  charactersGuessCells: Map<string, string[]> = new Map<string, string[]>();
  guessedCharacter!: MarvelCharacter;
  userGuess: string = '';
  isCorrect: boolean | null = null;

  constructor(private apiService: ApiService, private marvelService: MarvelService) {
  }

  ngOnInit(): void {
    this.marvelService.getCharacters().subscribe((response: MarvelCharacter[]) => {
      this.characters = response;
      this.correctCharacter = this.selectRandomCharacter();
    });
  }

  // Wählt einen zufälligen Charakter – niemals undefined
  selectRandomCharacter(): MarvelCharacter {
    const random = Math.floor(Math.random() * this.characters.length);
    return this.characters[random];
  }

  // Hauptlogik zum Überprüfen des Tipps
  checkGuess(): void {
      this.isCorrect = false;
      try {
        this.isCorrect = this.userGuess.toLowerCase() === this.correctCharacter.name.toLowerCase();
        this.guessedCharacter = this.getCharacterByName(this.userGuess);
        if (!this.charactersGuess.some(c => c.name === this.guessedCharacter.name)) {
          this.charactersGuess.push(this.guessedCharacter);
          this.characters = this.characters.filter(c => c !== this.guessedCharacter);
        }
        this.setCellClassMap();
      } catch (error) {
        console.error(error);
      }
  }

  // Liefert IMMER einen Charakter oder wirft Fehler
  getCharacterByName(name: string): MarvelCharacter {
    const cleanedName = name.trim().toLowerCase();
    const found = this.characters.find(
      character => character.name.toLowerCase() === cleanedName
    );

    if (!found) {
      throw new Error(`Charakter mit dem Namen '${name}' wurde nicht gefunden.`);
    }

    return found;
  }

  // Zum nächsten Charakter wechseln
  skipToNext(): void {
    this.correctCharacter = this.selectRandomCharacter();
    this.userGuess = '';
    this.isCorrect = null;
    this.charactersGuess = [];
  }

  setCellClassMap(): void {
    for (const characterGuess of this.charactersGuess) {
      const cellList: string[] = [];
      Object.keys(characterGuess).forEach((key) => {
        const guessKey = characterGuess[key as keyof typeof characterGuess];
        const correctKey = this.correctCharacter[key as keyof typeof this.correctCharacter];

        if (guessKey == correctKey) {
          console.log("CORRECT:" + guessKey + " vs " + correctKey);
          cellList.push("correct-cell")
        } else {
          console.log(guessKey + " vs " + correctKey);
          cellList.push("wrong-cell")
        }
      });
      this.charactersGuessCells.set(characterGuess.name, cellList);
    }
  }

  getCellClass(name: string, index: number): string {
    const cellClasses = this.charactersGuessCells?.get(name);
    return cellClasses?.[index] ?? '';
  }


  selectSuggestion(character: MarvelCharacter): void {
    this.userGuess = character.name;
    this.suggestions = [];
  }

  filterSuggestions(): void {
    const input = this.userGuess.trim().toLowerCase();
    if (!input) {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.characters.filter(character =>
      character.name.toLowerCase().startsWith(input)
    ).slice(0, 5); // Max. 5 Vorschläge
  }
}
