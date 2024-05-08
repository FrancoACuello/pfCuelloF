import { Injectable } from '@angular/core';
import { IUser } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { createUserPayload } from './models';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private httpClient: HttpClient) {}
// hago un llamado API usando .get //
  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.baseApiUrl + 'users');
    // return of(USERS_DB).pipe(delay(1500));
    // return throwError(() => new Error('Error al cargar los usuarios')).pipe(
    //   catchError((err) => of(err))
    // );
  }

  getUserById(id: number): Observable<IUser | undefined> {
    return this.httpClient.get<IUser>(environment.baseApiUrl +'users/' + id)
    // return of(USERS_DB.find((el) => el.id === id)).pipe(delay(1500));
  }


  createUser(payload: createUserPayload): Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.baseApiUrl}/users`, {})
  }
}
