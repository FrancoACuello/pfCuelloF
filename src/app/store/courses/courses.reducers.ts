import { Action, createReducer, on } from '@ngrx/store';
import { ICourse } from '../../layouts/dashboard/pages/courses/models';
import * as CoursesActions from './courses.actions';

export interface CoursesState {
  courses: ICourse[];
  loading: boolean;
  error: string | null;
}

export const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(course => course.id !== id)
  })),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    error
  }))
);