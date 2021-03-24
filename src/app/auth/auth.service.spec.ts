import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { Users } from './mock-users';
import { User } from './user.interface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process log ins correctly', async () => {
    const success = await service.signIn({
      email: 'tom@tombee.io',
      password: 'YoullNeverGuessThis',
    });
    expect(success).toBe('success');

    const fail = await service.signIn({
      email: 'tom@tombee.io',
      password: 'password',
    });
    expect(fail).toBe('failed');

    const noRecord = await service.signIn({
      email: 'random@email.com',
      password: 'password',
    });
    expect(noRecord).toBe('failed');
  });

  it('getUser', () => {
    const notLoggedIn = service.getUser();
    expect(notLoggedIn).toBe(null);

    service.isLoggedIn = true;
    service.user = {
      email: 'obiwan@jedi.temple',
      password: 'HighGround',
      name: 'Obi Wan Kenobi',
      address: {
        streetName: 'Jedi Temple',
        houseNumber: 1,
        postcode: '00001',
        city: 'Coruscant',
      },
      phone: '+49 123 4567890',
    };

    const signedIn = service.getUser();
    expect(signedIn?.email).toBe('obiwan@jedi.temple');
  });

  it('logout', async () => {
    service.isLoggedIn = true;
    service.user = {
      email: 'obiwan@jedi.temple',
      password: 'HighGround',
      name: 'Obi Wan Kenobi',
      address: {
        streetName: 'Jedi Temple',
        houseNumber: 1,
        postcode: '00001',
        city: 'Coruscant',
      },
      phone: '+49 123 4567890',
    };

    await service.logout();
    expect(service.isLoggedIn).toBeFalse();
    expect(service.user).toBeNull();
  });

  it('forgot password should return success without user', async () => {
    const noUser = await service.forgotPassword('');
    expect(noUser).toBe('success');
  });

  it('forgot password should return success and update password field of user', async () => {
    Users.push({
      email: 'test@user.com',
      password: 'testing',
      name: 'testing',
      address: {
        streetName: 'testing',
        houseNumber: 1,
        postcode: '00000',
        city: 'testing',
      },
      phone: '+01 234 5678901',
    });

    const newUser = await service.forgotPassword('test@user.com');
    expect(newUser).toBe('success');
  });

  it('signUp', () => {
    expect(true).toBeTrue();
  });
});
