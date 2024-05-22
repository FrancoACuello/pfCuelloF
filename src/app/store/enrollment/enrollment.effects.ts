import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as EnrollmentsActions from './enrollment.actions';
import { of } from 'rxjs';
import { EnrollmentService } from '../../layouts/dashboard/pages/enrollments/enrollments.service';

@Injectable()
export class EnrollmentsEffects {

  constructor(private actions$: Actions, private enrollmentService: EnrollmentService) {}

  loadEnrollments$ = createEffect(() => this.actions$.pipe(
    ofType(EnrollmentsActions.loadEnrollments),
    mergeMap(() => this.enrollmentService.getEnrollments()
      .pipe(
        map(enrollments => EnrollmentsActions.loadEnrollmentsSuccess({ enrollments })),
        catchError(error => of(EnrollmentsActions.loadEnrollmentsFailure({ error })))
      ))
    )
  );

  enrollStudent$ = createEffect(() => this.actions$.pipe(
    ofType(EnrollmentsActions.enrollStudent),
    mergeMap(({ courseId, userId }) => this.enrollmentService.enrollStudent(courseId, userId)
      .pipe(
        map(enrollment => EnrollmentsActions.enrollStudentSuccess({ enrollment })),
        catchError(error => of(EnrollmentsActions.enrollStudentFailure({ error })))
      ))
    )
  );
}
