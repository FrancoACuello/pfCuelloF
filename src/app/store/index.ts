import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './users/users.reducer';
import { coursesReducer, CoursesState } from './courses/courses.reducers';
import { enrollmentsReducer, EnrollmentsState } from './enrollment/enrollment.reducers';
import { authReducer, AuthState } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export interface AppState {
    users: UsersState;
    courses: CoursesState;
    enrollments: EnrollmentsState;
    auth: AuthState; 

}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    users: usersReducer,
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
    auth: authReducer,

};

export * as UserActions from './users/users.actions';
export * as CourseActions from './courses/courses.actions';
export * as EnrollmentActions from './enrollment/enrollment.actions';
export * as AuthActions from  './auth/auth.actions'