import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../layouts/dashboard/pages/users/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();

  login(): void {
    this._authUser$.next({
        id: 1,
        firstName: 'Franco',
        lastName: 'Cuello',
        email: 'Franco.cuello@gmail.com',
        role: 'ADMIN',
        createdAt: new Date()
    });
  }

  logout(): void {
    this._authUser$.next(null);
  }
}
