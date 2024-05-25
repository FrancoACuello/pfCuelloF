import { createAction, props } from '@ngrx/store';
import { LoginData } from '../../layouts/auth/models';
import { IUser } from '../../layouts/dashboard/pages/users/models';


export const login = createAction(
  '[Auth] Login',
  props<{ loginData: LoginData }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');