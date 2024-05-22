import { createAction, props } from '@ngrx/store';
import { IEnrollment } from '../../layouts/dashboard/pages/enrollments/models';

export const loadEnrollments = createAction('[Enrollment] Load Enrollments');

export const loadEnrollmentsSuccess = createAction(
  '[Enrollment] Load Enrollments Success',
  props<{ enrollments: IEnrollment[] }>()
);

export const loadEnrollmentsFailure = createAction(
  '[Enrollment] Load Enrollments Failure',
  props<{ error: any }>()
);

export const enrollStudent = createAction(
  '[Enrollment] Enroll Student',
  props<{ courseId: string, userId: string }>()
);

export const enrollStudentSuccess = createAction(
  '[Enrollment] Enroll Student Success',
  props<{ enrollment: IEnrollment }>()
);

export const enrollStudentFailure = createAction(
  '[Enrollment] Enroll Student Failure',
  props<{ error: any }>()
);
