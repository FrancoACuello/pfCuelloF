import { Action, createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';
import { IEnrollment } from '../../layouts/dashboard/pages/enrollments/models';

export interface EnrollmentsState {
  enrollments: IEnrollment[];
  loading: boolean;
  error: any;
}

export const initialEnrollmentsState: EnrollmentsState = {
  enrollments: [],
  loading: false,
  error: null
};

const _enrollmentsReducer = createReducer(
  initialEnrollmentsState,
  on(EnrollmentActions.loadEnrollments, state => ({
     ...state, loading: true 
    })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrollments }) => ({ ...state, enrollments, loading: false })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(EnrollmentActions.enrollStudent, state => ({
     ...state, loading: true 
    })),
  on(EnrollmentActions.enrollStudentSuccess, (state, { enrollment }) => ({
    ...state,
    enrollments: [...state.enrollments, enrollment],
    loading: false
  })),
  on(EnrollmentActions.enrollStudentFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(EnrollmentActions.deleteEnrollmentSuccess, (state, { userId }) => ({
    ...state,
    enrollments: state.enrollments.filter(enrollment => enrollment.userId !== userId)
  })),
  on(EnrollmentActions.deleteEnrollmentFailure, (state, { error }) => ({ ...state, error }))
);

export function enrollmentsReducer(state: EnrollmentsState | undefined, action: Action) {
  return _enrollmentsReducer(state, action);
}
