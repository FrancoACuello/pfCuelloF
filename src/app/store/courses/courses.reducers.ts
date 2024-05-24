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

const _coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => ({ ...state, loading: true })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => ({ ...state, loading: false, courses })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(CoursesActions.createCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course]
  })),
  on(CoursesActions.createCourseFailure, (state, { error }) => ({ ...state, error })),

  on(CoursesActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map(c => (c.id === course.id ? course : c))
  })),
  on(CoursesActions.updateCourseFailure, (state, { error }) => ({ ...state, error })),

  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(course => course.id !== id)
  })),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({ ...state, error }))

);
export function coursesReducer(state: CoursesState | undefined, action: Action) {
  return _coursesReducer(state, action);
}
