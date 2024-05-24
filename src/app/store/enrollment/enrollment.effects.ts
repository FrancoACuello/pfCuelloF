import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EnrollmentActions from './enrollment.actions';
import { EnrollmentService } from '../../layouts/dashboard/pages/enrollments/enrollments.service';

@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      mergeMap(() =>
        this.enrollmentService.getEnrollments().pipe(
          map(enrollments => EnrollmentActions.loadEnrollmentsSuccess({ enrollments })),
          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error })))
        )
      )
    )
  );

  enrollStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.enrollStudent),
      mergeMap(({ courseId, userId }) =>
        this.enrollmentService.enrollStudent(courseId, userId).pipe(
          map(enrollment => EnrollmentActions.enrollStudentSuccess({ enrollment })),
          catchError(error => of(EnrollmentActions.enrollStudentFailure({ error })))
        )
      )
    )
  );

  deleteEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      mergeMap(({ userId }) =>
        this.enrollmentService.deleteEnrollment(userId).pipe(
          map(() => EnrollmentActions.deleteEnrollmentSuccess({ userId })),
          catchError(error => of(EnrollmentActions.deleteEnrollmentFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private enrollmentService: EnrollmentService,
    private store: Store
  ) {}
}
