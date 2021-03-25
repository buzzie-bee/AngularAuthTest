import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$'),
      ],
    ],
    password: ['', Validators.required],
  });

  loading: boolean = false;
  hide: boolean = true;
  failed: boolean = false;

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.failed = false;

    if (
      this.loginForm.controls.email.errors ||
      this.loginForm.controls.password.errors
    ) {
      this.loginForm.markAllAsTouched();
      this.loading = false;
      return;
    }
    const response = await this.authService.signIn({ email, password });

    if (response === 'success') {
      this.router.navigate(['/dashboard']);
    }

    this.failed = true;
    this.loading = false;
  }
}
