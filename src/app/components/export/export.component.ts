import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  imports: [
    FormsModule,
    DatePipe,
    NgIf,
  ],
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  @Input() exportData: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitExport = new EventEmitter<any>();

  name = '';
  geschlecht = '';
  volljaehrig = '';
  geburtsdatum = '';
  aktuellesDatum!: Date;
  showError = false;

  ngOnInit() {
    this.aktuellesDatum = new Date();
  }

  submitForm(form: NgForm) {
    const result = {
      name: this.name,
      geschlecht: this.geschlecht,
      volljaehrig: this.volljaehrig,
      geburtsdatum: this.geburtsdatum,
      aktuellesDatum: this.aktuellesDatum.toISOString(),
      daten: this.exportData
    };
    this.submitExport.emit(result);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }

  checkAndSubmit(form: NgForm) {
    if (form.invalid) {
      this.showError = true;
      // Alle Felder als touched markieren, damit Fehlermeldungen im Template auch sichtbar werden
      Object.values(form.controls).forEach(control => control.markAsTouched());
    } else {
      this.showError = false;
      this.submitForm(form); // hier dein normaler Submit-Handler
    }
  }

}
