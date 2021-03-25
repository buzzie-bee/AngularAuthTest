import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  resetForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$'),
      ],
    ],
  });

  loading: boolean = false;
  success: boolean = false;
  failed: boolean = false;

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const { email } = this.resetForm.value;
    this.loading = true;
    this.failed = false;

    if (this.resetForm.controls.email.errors) {
      this.resetForm.markAllAsTouched();
      this.loading = false;
      return;
    }
    const response = await this.authService.forgotPassword(email);

    if (response === 'success') {
      this.success = true;
    }

    this.loading = false;
  }
}
