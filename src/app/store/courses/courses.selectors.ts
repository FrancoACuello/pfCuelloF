import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.loading
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.error
);
