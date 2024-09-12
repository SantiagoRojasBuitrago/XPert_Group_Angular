import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; 
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
      providers: [AuthGuard]
    });

    authGuard = TestBed.inject(AuthGuard); 
    router = TestBed.inject(Router); 
  });

  it('should allow route activation if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');

    const canActivate = authGuard.canActivate();

    expect(canActivate).toBe(true);
  });

  it('should block route activation and redirect to login if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const routerSpy = spyOn(router, 'navigate');

    const canActivate = authGuard.canActivate();

    expect(canActivate).toBe(false);

    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
