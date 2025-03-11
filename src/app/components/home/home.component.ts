import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
  data: any[] = [];
  character: any = null;
  userGuess: string = '';
  isCorrect: boolean | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe((response) => {
      this.data = response.data.results;
      this.selectRandomCharacter();
    });
  }

  // Zufälligen Charakter auswählen
  selectRandomCharacter(): void {
    if (this.data.length > 0) {
      const random = Math.floor(Math.random() * this.data.length)
      this.character = this.data[random];
      this.isCorrect = null; // Zurücksetzen der Antwort, wenn ein neuer Charakter angezeigt wird
      this.userGuess = ''; // Eingabefeld zurücksetzen
    }
  }

  // Überprüfen der Benutzereingabe
  checkGuess(): void {
    if (this.userGuess.toLowerCase() === this.character.name.toLowerCase()) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

  // Zum nächsten Charakter skippen
  skipToNext(): void {
    this.selectRandomCharacter();
  }
}
