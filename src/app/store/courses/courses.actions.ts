import { createAction, props } from '@ngrx/store';
import { ICourse } from '../../../app/layouts/dashboard/pages/courses/models';

export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction('[Courses] Load Courses Success', props<{ courses: ICourse[] }>());
export const loadCoursesFailure = createAction('[Courses] Load Courses Failure', props<{ error: string }>());

export const createCourse = createAction('[Courses] Create Course', props<{ course: ICourse }>());
export const createCourseSuccess = createAction('[Courses] Create Course Success', props<{ course: ICourse }>());
export const createCourseFailure = createAction('[Courses] Create Course Failure', props<{ error: string }>());

export const updateCourse = createAction('[Courses] Update Course', props<{ course: ICourse }>());
export const updateCourseSuccess = createAction('[Courses] Update Course Success', props<{ course: ICourse }>());
export const updateCourseFailure = createAction('[Courses] Update Course Failure', props<{ error: string }>());

export const deleteCourse = createAction('[Courses] Delete Course', props<{ id: number }>());
export const deleteCourseSuccess = createAction('[Courses] Delete Course Success', props<{ id: number }>());
export const deleteCourseFailure = createAction('[Courses] Delete Course Failure', props<{ error: string }>());
