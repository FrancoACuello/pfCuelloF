
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IUser } from '../../layouts/dashboard/pages/users/models';

export interface AuthState {
  user: IUser | null;
  error: any;
}

export const initialAuthState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, error })),
  on(AuthActions.logout, () => initialAuthState)
);
