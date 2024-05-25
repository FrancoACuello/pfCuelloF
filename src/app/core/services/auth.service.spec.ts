import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('Debe emitir un error si los datos de inicio de sesión son incorrectos', (done) => {
    authService.login({
      email: 'falso@email.com',
      password: 'asdasdasd'
    }).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBe('Correo o contraseña incorrectos');
        done();
      }
    });
  });
  


  it('Debe eliminar el token de acceso después de cerrar sesión', () => {
    spyOn(localStorage, 'removeItem');
    authService.logout().subscribe(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    });
  });
});
