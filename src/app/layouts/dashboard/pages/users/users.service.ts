import { Injectable } from '@angular/core';
import { IUser } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';

const USERS_DB: IUser[] = [
  {
    id: 1,
    firstName: 'Franco',
    lastName: 'Cuello',
    email: 'Franco.cuello@gmail.com',
    role: 'ADMIN',
    createdAt: new Date()
},
  {
    id: 2,
    firstName: 'Luca',
    lastName: 'Gaido',
    email: 'Luca.Gaido@gmail.com',
    role: 'USER',
    createdAt: new Date()
},
  {
    id: 3,
    firstName: 'Martina',
    lastName: 'Martinangeli',
    email: 'Martina.martinangeli@gmail.com',
    role: 'USER',
    createdAt: new Date()
},
];

@Injectable({ providedIn: 'root' })
export class UsersService {
  getUsers(): Observable<IUser[]> {
    return of(USERS_DB).pipe(delay(1500));
    // return throwError(() => new Error('Error al cargar los usuarios')).pipe(
    //   catchError((err) => of(err))
    // );
  }

  getUserById(id: number): Observable<IUser | undefined> {
    return of(USERS_DB.find((el) => el.id === id)).pipe(delay(1500));
  }
}
