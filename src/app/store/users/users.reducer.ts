// src/app/store/users/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { IUser } from '../../layouts/dashboard/pages/users/models';

export interface UsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u)
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
