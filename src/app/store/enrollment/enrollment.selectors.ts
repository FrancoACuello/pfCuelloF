import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentsState } from './enrollment.reducers';
import { IEnrollment } from '../../layouts/dashboard/pages/enrollments/models';

export const selectEnrollmentsState = createFeatureSelector<EnrollmentsState>('enrollments');

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  state => state.enrollments
);