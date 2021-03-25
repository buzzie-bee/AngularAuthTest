import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  user: User | null = null;

  async ngOnInit(): Promise<void> {
    // redirect to login page if no user
    this.user = await this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['login']);
      return;
    }
  }
}
