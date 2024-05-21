import { Injectable } from '@angular/core';
import { CreateUserPayload, IUser } from './models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UsersService {

  private baseAPIURL = environment.baseAPIURL; 


  constructor(private httpClient: HttpClient, ) {}

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.baseAPIURL + '/users');
  }

  getUserById(id: string): Observable<IUser | undefined> {
    return this.httpClient.get<IUser>(`${environment.baseAPIURL}/users/${id}`);
  }

  createUser(payload: CreateUserPayload): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.baseAPIURL}/users`,
      payload
    );
  }

  updateUser(user: IUser):Observable<IUser>{
    return this.httpClient.put<IUser>(`${this.baseAPIURL}/users/${user.id}`, user);
  }

  deleteAndUpdateUsers(id: string): Observable<void> {
    const deleteUserUrl = `${this.baseAPIURL}/users/${id}`;
    return this.httpClient.delete<void>(deleteUserUrl).pipe(
      tap(() => {
      })
    );
  }
}

