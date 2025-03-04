import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {AppModule} from './app.module';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe((response) => {
      this.data = response.data.results; // Die Charakterdaten
      console.log(this.data);
    });
  }
}
