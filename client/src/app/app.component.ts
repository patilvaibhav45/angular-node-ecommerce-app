import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private router: Router, private token: TokenStorageService) {}

  ngOnInit(): void {
    const user = this.token.getUser();
    if (user) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
