import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'auth-test';
  isLoggedIn = this.authService.isLoggedIn;

  // Probably would be way better with RxJS but need to keep track
  // of whether the user is logged in or not.
  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.logout();
  }
}
