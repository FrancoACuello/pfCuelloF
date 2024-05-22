import { createReducer, on } from '@ngrx/store';
import * as EnrollmentsActions from './enrollment.actions';
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

export const enrollmentsReducer = createReducer(
  initialEnrollmentsState,
  on(EnrollmentsActions.loadEnrollments, state => ({ ...state, loading: true })),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, { enrollments }) => ({ ...state, enrollments, loading: false })),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(EnrollmentsActions.enrollStudentSuccess, (state, { enrollment }) => ({
    ...state,
    enrollments: [...state.enrollments, enrollment]
  })),
);
