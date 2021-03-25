import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';

import { SignUpComponent } from './sign-up.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signUpForm.controls.email.valid).toBeFalsy();
  });

  it('throws an error with an invalid email & password', () => {
    component.signUpForm.setValue({
      name: '',
      email: '',
      streetName: '',
      houseNumber: '',
      postcode: '',
      city: '',
      phone: '',
      password: '',
    });
    expect(component.signUpForm.controls.name.valid).toBeFalsy();
    expect(component.signUpForm.controls.email.valid).toBeFalsy();
    expect(component.signUpForm.controls.streetName.valid).toBeFalsy();
    expect(component.signUpForm.controls.houseNumber.valid).toBeFalsy();
    expect(component.signUpForm.controls.postcode.valid).toBeFalsy();
    expect(component.signUpForm.controls.city.valid).toBeFalsy();
    expect(component.signUpForm.controls.phone.valid).toBeFalsy();
    expect(component.signUpForm.controls.password.valid).toBeFalsy();
  });

  it('is valid with a valid email & password', () => {
    component.signUpForm.setValue({
      name: 'Test McTesterson',
      email: 'test@test.com',
      streetName: 'Test street',
      houseNumber: '8',
      postcode: '83789',
      city: 'Test Town',
      phone: '+49 837 8837883',
      password: 'testing123',
    });
    expect(component.signUpForm.controls.name.valid).toBeTruthy();
    expect(component.signUpForm.controls.email.valid).toBeTruthy();
    expect(component.signUpForm.controls.streetName.valid).toBeTruthy();
    expect(component.signUpForm.controls.houseNumber.valid).toBeTruthy();
    expect(component.signUpForm.controls.postcode.valid).toBeTruthy();
    expect(component.signUpForm.controls.city.valid).toBeTruthy();
    expect(component.signUpForm.controls.phone.valid).toBeTruthy();
    expect(component.signUpForm.controls.password.valid).toBeTruthy();
  });
});
