import {Component, input, OnInit} from '@angular/core';
// import {ApiService} from '../../services/api.service';
import {KeyValuePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MarvelService} from '../../services/marvel.service';
import {MarvelCharacter} from '../../services/marvel-character.model';
import {ExportComponent} from '../export/export.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  // Beispiel in der Component:
  highlightedIndex: number = -1;
  tries: number = 0;
  showExportModal: boolean = false;
  characters: MarvelCharacter[] = [];
  suggestions: MarvelCharacter[] = [];
  correctCharacter!: MarvelCharacter;
  charactersGuess: MarvelCharacter[] = [];
  charactersGuessCells: Map<string, string[]> = new Map<string, string[]>();
  guessedCharacter!: MarvelCharacter;
  userGuess: string = '';
  isCorrect: boolean | null = null;
  errorMessage: string = '';

  dataToExport = {};

  constructor(/*private apiService: ApiService*/ private marvelService: MarvelService) {
  }

  ngOnInit(): void {
    this.marvelService.getCharacters().subscribe((response: MarvelCharacter[]) => {
      this.characters = response;
      this.correctCharacter = this.selectRandomCharacter();
    });
    this.isCorrect = false;
    this.suggestions = [];
    this.charactersGuess = [];
    this.charactersGuessCells = new Map<string, string[]>();

  }

  // Wählt einen zufälligen Charakter – niemals undefined
  selectRandomCharacter(): MarvelCharacter {
    const random = Math.floor(Math.random() * this.characters.length);
    return this.characters[random];
  }

  // Hauptlogik zum Überprüfen des Tipps
  checkGuess(): void {
    if (!this.userGuess || this.userGuess.trim() === '') {
      this.errorMessage = 'Bitte gib einen Charakternamen ein!';
      return;  // Funktion verlassen, damit kein weiterer Code ausgeführt wird
    }
    const cleanedGuess = this.userGuess.trim().toLowerCase();
    const alreadyGuessed = this.charactersGuess.some(
      c => c.name.toLowerCase() === cleanedGuess
    );

    if (alreadyGuessed) {
      this.errorMessage = 'Diesen Charakter hast du bereits geraten!';
      return;
    }
    this.errorMessage = '';
    this.isCorrect = false;
    try {
      this.isCorrect = this.userGuess.toLowerCase() === this.correctCharacter.name.toLowerCase();
      if (this.isCorrect) {
        this.dataToExport = {
          name: this.correctCharacter.name,
          geschlecht: this.correctCharacter.geschlecht,
          spezies: this.correctCharacter.spezies,
          team: this.correctCharacter.team,
          herkunft: this.correctCharacter.herkunft,
          jahr: this.correctCharacter.jahr,
          seite: this.correctCharacter.seite,
          faehigkeit: this.correctCharacter.faehigkeit,
          versuche: this.tries,
        }
      }
      this.tries++;
      this.guessedCharacter = this.getCharacterByName(this.userGuess);
      if (!this.charactersGuess.some(c => c.name === this.guessedCharacter.name)) {
        this.charactersGuess.push(this.guessedCharacter);
        this.characters = this.characters.filter(c => c !== this.guessedCharacter);
      }
      this.setCellClassMap();
      this.userGuess = '';
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
    this.highlightedIndex = -1; // Zurücksetzen

    if (!input) {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.characters.filter(character =>
      character.name.toLowerCase().startsWith(input)
    ).slice(0, 5); // Max. 5 Vorschläge
  }

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (this.suggestions.length === 0) {
      if (key === 'Enter') {
        event.preventDefault();
        this.checkGuess();
      }
      return;
    }

    if (key === 'ArrowDown') {
      event.preventDefault();
      this.highlightedIndex = (this.highlightedIndex + 1) % this.suggestions.length;
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      this.highlightedIndex =
        (this.highlightedIndex - 1 + this.suggestions.length) % this.suggestions.length;
    } else if (key === 'Enter') {
      event.preventDefault();
      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
        this.selectSuggestion(this.suggestions[this.highlightedIndex]);
      } else {
        this.checkGuess();
      }
    }
  }



  restartGame() {
    this.ngOnInit();
  }

  openExportModal() {
    this.showExportModal = true;
  }

  closeExportModal() {
    this.showExportModal = false;
  }

  handleExportSubmit(result: any): void {
    console.log('Exportdaten erhalten:', result);

    // Beispiel: Lokale Datei-Exportlogik
    const blob = new Blob([JSON.stringify(result)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${result.name}_${result.date}.json`;
    link.click();

    this.closeExportModal();
  }

}
