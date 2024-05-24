import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentsState } from './enrollment.reducers';

export const selectEnrollmentsState = createFeatureSelector<EnrollmentsState>('enrollments');

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  state => state.enrollments
);

export const selectEnrollmentsLoading = createSelector(
  selectEnrollmentsState,
  state => state.loading
);

export const selectEnrollmentsError = createSelector(
  selectEnrollmentsState,
  state => state.error
);
