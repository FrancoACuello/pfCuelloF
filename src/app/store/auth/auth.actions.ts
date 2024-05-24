
import { createAction, props } from '@ngrx/store';
import { IUser } from '../../layouts/dashboard/pages/users/models';
import { LoginData } from '../../layouts/auth/models';

export const login = createAction('[Auth] Login', props<{ data: LoginData }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: IUser }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const logout = createAction('[Auth] Logout');
