import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { IUser } from '../../layouts/dashboard/pages/users/models';
import { LoginData } from '../../layouts/auth/models';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private MOCK_AUTH_USER: IUser = {
    id: '1',
    createdAt: new Date(),
    email: 'franco@mail.com',
    firstName: 'Franco',
    lastName: 'Cuello',
    role: 'ADMIN',
  };

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$: Observable<IUser | null> = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: LoginData): Observable<IUser> {
    if (data.email !== 'franco@mail.com' || data.password !== 'pepito') {
      return throwError('Correo o contraseña incorrectos');
    } else {
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem('accessToken', 'asdasdasdasd123123123');
      this.router.navigate(['dashboard', 'home']);
      return of(this.MOCK_AUTH_USER);
    }
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this.MOCK_AUTH_USER);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): Observable<void> {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
    return of();
  }
}
  