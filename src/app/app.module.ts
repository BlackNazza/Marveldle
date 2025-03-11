import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Falls nicht schon importiert
import { HttpClientModule } from '@angular/common/http'; // Hier das HttpClientModule importieren
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';
import { HomeComponent } from './components/home/home.component';  // Achte darauf, ApiService hier zu importieren

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AppComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, HomeComponent],  // HttpClientModule hier hinzufügen
  providers: [ApiService],  // ApiService als Provider hier hinzufügen
  bootstrap: [AppComponent],
})
export class AppModule {}
