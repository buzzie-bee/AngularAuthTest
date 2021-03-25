import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';

import { LogInComponent } from './log-in.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
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
    expect(component.loginForm.controls.email.valid).toBeFalsy();
  });

  it('throws an error with an invalid email & password', () => {
    component.loginForm.setValue({ email: 'test', password: '' });
    expect(component.loginForm.controls.email.valid).toBeFalsy();
    expect(component.loginForm.controls.password.valid).toBeFalsy();
  });

  it('is valid with a valid email & password', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: '1234' });
    expect(component.loginForm.controls.email.valid).toBeTruthy();
    expect(component.loginForm.controls.password.valid).toBeTruthy();
  });

  // TODO: Figure out how to check element with classname is in document
  // it('show loading spinner when loading', () => {
  //   component.loading = false;
  //   const loadingButton = document.getElementsByClassName(
  //     'submit-button-loading'
  //   );
  //   expect(loadingButton).toBeDefined();
  // });
});
