import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService Unit Tests', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    localStorage.clear();
    routerMock.navigate.mockClear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  // Test 5: Aldin Memic
  it('[Aldin Memic] should perform autoLogin if credentials exist in localStorage', () => {
    const dummyUser = { success: true, token: 'xyz123', email: 'test@test.com', isAdmin: false };
    localStorage.setItem('user', JSON.stringify(dummyUser));

    // When the service is instantiated, the constructor calls autoLogin
    service = TestBed.inject(AuthService);
    
    expect(service.user.value).toEqual(dummyUser);
  });

  // Test 10: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should clear localStorage and redirect to login on logout', () => {
    const dummyUser = { success: true, token: 'xyz123', email: 'test@test.com', isAdmin: false };
    localStorage.setItem('user', JSON.stringify(dummyUser));

    service = TestBed.inject(AuthService);
    expect(service.user.value).toEqual(dummyUser);

    service.logout();

    expect(localStorage.getItem('user')).toBeNull();
    expect(service.user.value).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['auth/login']);
  });
});
