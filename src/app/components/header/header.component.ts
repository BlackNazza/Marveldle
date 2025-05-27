import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent {
  constructor(private router: Router) {}

  refreshOrNavigate(url: string) {
    if (this.router.url === url) {
      // Gleiche URL: Seite neu laden
      window.location.reload();
    } else {
      // Andere URL: Navigieren
      this.router.navigateByUrl(url);
    }
  }
}
