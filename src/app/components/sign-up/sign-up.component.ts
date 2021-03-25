import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$'),
      ],
    ],
    streetName: ['', [Validators.required, Validators.minLength(2)]],
    houseNumber: [null],
    postcode: ['', [Validators.required, Validators.minLength(2)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', Validators.required],
  });

  loading: boolean = false;
  hide: boolean = true;
  failed: boolean = false;
  exists: boolean = false;

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const {
      name,
      email,
      streetName,
      houseNumber,
      postcode,
      city,
      phone,
      password,
    } = this.signUpForm.value;

    this.loading = true;
    this.failed = false;
    this.exists = false;

    this.signUpForm.markAllAsTouched();

    const hasErrors = Object.keys(this.signUpForm.value).reduce(
      (errors, field) => {
        errors = this.signUpForm.controls[field].errors ? true : errors;
        return errors;
      },
      false
    );

    if (hasErrors) {
      this.signUpForm.markAllAsTouched();
      this.loading = false;
      return;
    }
    const response = await this.authService.signUp({
      name,
      email,
      address: {
        streetName,
        houseNumber,
        postcode,
        city,
      },
      phone,
      password,
    });

    console.log(response);
    setTimeout(() => {
      console.log(this.authService.getUser());
    }, 2000);

    if (response === 'success') {
      this.router.navigate(['/dashboard']);
    }

    if (response === 'exists') {
      this.exists = true;
    }

    this.failed = true;
    this.loading = false;
  }
}
