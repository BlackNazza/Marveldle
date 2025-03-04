import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent }, // Startseite
  { path: 'header', component: HeaderComponent }, // Header als eigene Route
  { path: 'home', component: HomeComponent }, // Startseite
  { path: 'footer', component: FooterComponent }, // Footer als eigene Route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback auf HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
