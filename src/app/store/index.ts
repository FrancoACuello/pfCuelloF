import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface AppState {}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {

};

export * as UserActions from './users/users.actions'
