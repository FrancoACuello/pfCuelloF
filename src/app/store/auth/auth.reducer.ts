import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IUser } from '../../layouts/dashboard/pages/users/models';

export interface AuthState {
  user: IUser | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    error: null,
    loading: false,
  }))
);
