import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { IUser } from '../../layouts/dashboard/pages/users/models'

export interface UsersState {
  users: IUser[];
  loading: boolean;
  error: any;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers,
     state => ({ ...state, loading: true })),
  
  on(UsersActions.loadUsersSuccess,
     (state, { users }) => ({ ...state, loading: false, users })),
  
  on(UsersActions.loadUsersFailure,
     (state, { error }) => ({ ...state, loading: false, error })),
  
  on(UsersActions.createUser,
     state => ({ ...state, loading: true })),
  
  on(UsersActions.createUserSuccess,
     (state, { user }) => ({ ...state, loading: false, users: [...state.users, user] })),
  
  on(UsersActions.createUserFailure,
     (state, { error }) => ({ ...state, loading: false, error })),
     
  on(UsersActions.deleteUser,
     state => ({ ...state, loading: true })),
     
  on(UsersActions.deleteUserSuccess,
       (state, { id }) => ({
      ...state,
      loading: false,
      users: state.users.filter(user => user.id !== id)
    })),

   on(UsersActions.deleteUserFailure,
     (state, { error }) => ({ ...state, loading: false, error })),

   on(UsersActions.updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),
);
    