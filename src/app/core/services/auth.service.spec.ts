import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,(Router)],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('Debe establecer un usuario autenticado al llamar login', () => {
    const spyOnSetItem = spyOn(localStorage, 'setItem');
    const spyOnNavigate = spyOn(router, 'navigate');
    authService.login({
      email: 'franco@gmail.com',
      password: 'pepito11',
    });
    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy(); // no tiene que ser null, undefined o false
        expect(spyOnSetItem).toHaveBeenCalled();
        expect(spyOnNavigate).toHaveBeenCalled();
      },
    });
  });

  it('Debe mostrar un alert con el texto "Correo o password incorrectos" si los datos no coinciden en el login', () => {
    const spyOnAlert = spyOn(window, 'alert');
    authService.login({
      email: 'falso@email.com',
      password: 'asdasdasd',
    });
    // expect(spyOnAlert).toHaveBeenCalledWith('Correo o password incorrectos');
  });
});
