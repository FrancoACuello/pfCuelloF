import { createAction, props } from '@ngrx/store';
import { IUser, CreateUserPayload } from '../../layouts/dashboard/pages/users/models'


// Acciones para cargar usuarios
export const loadUsers = createAction
('[Users Page] Load Users');

export const loadUsersSuccess = createAction
('[Users] Load Users Success', props<{ users: IUser[] }>());

export const loadUsersFailure = createAction
('[Users] Load Users Failure', props<{ error: any }>());


// Acciones para crear un usuario
export const createUser = createAction
('[Users] Create User', props<{ payload: CreateUserPayload }>());

export const createUserSuccess = createAction
('[Users] Create User Success', props<{ user: IUser }>());

export const createUserFailure = createAction
('[Users] Create User Failure', props<{ error: any }>());


// Acciones para eliminar un usuario
export const deleteUser = createAction
('[Users] Delete User', props<{ id: number }>());

export const deleteUserSuccess = createAction
('[Users] Delete User Success', props<{ id: number }>());

export const deleteUserFailure = createAction
('[Users] Delete User Failure', props<{ error: any }>());


// Acciones para actualizar un usuario
export const updateUser = createAction
('[Users] Update User',props<{ user: IUser}>());

export const updateUserSuccess = createAction
('[Users] Update User Success',props<{ user: IUser}>());

export const updateUserFailure = createAction
('[Users] Update User Failure',props<{ error: any}>());

