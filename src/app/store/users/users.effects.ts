import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from '../../layouts/dashboard/pages/users/users.service';
import * as UsersActions from './users.actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserActions } from '..';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this.usersService.getUsers().pipe(
      map(users => UsersActions.loadUsersSuccess({ users })),
      catchError(error => of(UsersActions.loadUsersFailure({ error })))
      )
    )
  )
);

createUser$ = createEffect(() => this.actions$.pipe(
  ofType(UsersActions.createUser),
  mergeMap(action => this.usersService.createUser(action.user).pipe(
    map(user => UsersActions.createUserSuccess({ user })),
    catchError(error => of(UsersActions.createUserFailure({ error })))
    )
  )
));


  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map((updatedUser) => UsersActions.updateUserSuccess({ user: updatedUser })),
          catchError((error) => of(UsersActions.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.deleteUser),
    mergeMap(action => this.usersService.deleteAndUpdateUsers(action.id).pipe(
      map(() => UsersActions.deleteUserSuccess({ id: action.id })),
      catchError(error => of(UsersActions.deleteUserFailure({ error: error.message })))
    ))
  ));
}
