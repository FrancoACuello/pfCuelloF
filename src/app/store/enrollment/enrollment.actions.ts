import { createAction, props } from '@ngrx/store';
import { IEnrollment } from '../../layouts/dashboard/pages/enrollments/models';

export const loadEnrollments = createAction(
  '[Enrollment] Load Enrollments'
);

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

export const updateEnrollment = createAction(
  '[Enrollment] Update Enrollment',
  props<{ enrollmentId: string, updatedEnrollment: Partial<IEnrollment> }>()
);

export const deleteEnrollment = createAction(
  '[Enrollment] Delete Enrollment',
  props<{ userId: string }>()
);

export const deleteEnrollmentSuccess = createAction(
  '[Enrollment] Delete Enrollment Success',
  props<{ userId: string }>()
);

export const deleteEnrollmentFailure = createAction(
  '[Enrollment] Delete Enrollment Failure',
  props<{ error: any }>()
);
