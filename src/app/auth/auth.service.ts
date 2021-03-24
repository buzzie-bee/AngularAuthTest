import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { Users } from './mock-users';

// Mock auth service using in memory array of Users
// Would write backend http logic here in a real app

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor() {}

  getUser(): User | null {
    if (this.isLoggedIn) {
      if (this.user) {
        const clone = Object.assign({}, this.user, { password: '' });
        return clone;
      }
    }
    return null;
  }

  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<'success' | 'failed'> {
    // Check if user with the same email and password exists, set loggedin and user if they do

    return new Promise((resolve) => {
      const user = Users.find(
        (user) => user.email === email && user.password === password
      );
      setTimeout(() => {
        if (user) {
          this.isLoggedIn = true;
          this.user = user;
          resolve('success');
        }
        resolve('failed');
      }, 1500);
    });
  }

  logout(): Promise<'success'> {
    // Initialise isLoggedIn and user

    return new Promise((resolve) => {
      setTimeout(() => {
        this.isLoggedIn = false;
        this.user = null;
        resolve('success');
      }, 1500);
    });
  }

  signUp(user: User): Promise<'success' | 'exists'> {
    // Append user to Users
    // Note: Not implementing extra validation here.
    // Would normally be done on the backend as frontend stuff can't be
    // trusted anyway and form should have validated
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Users.findIndex((auth: User) => user.email === auth.email) !== -1) {
          resolve('exists');
        }
        Users.push(user);
        this.isLoggedIn = true;
        this.user = user;
        resolve('success');
      }, 1500);
    });
  }

  forgotPassword(email: string): Promise<'success'> {
    // If user record exists, update password to be a temp number
    // Note: (would be randomly generated on the backend).
    // Don't report back if email already exists or not
    return new Promise((resolve) => {
      setTimeout(() => {
        Users.map((user: User) => {
          if (user.email === email) {
            return {
              ...user,
              password: '12345',
            };
          }
          return user;
        });

        resolve('success');
      }, 1500);
    });
  }
}
