import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../layouts/dashboard/pages/courses/course.service';
import * as CoursesActions from './courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.loadCourses),
    mergeMap(() => this.coursesService.getCourses().pipe(
      map(courses => CoursesActions.loadCoursesSuccess({ courses })),
      catchError(error => of(CoursesActions.loadCoursesFailure({ error: error.message })))
      )
    )
  ));

  createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.createCourse),
    mergeMap(action => this.coursesService.createCourse(action.course).pipe(
      map(course => CoursesActions.createCourseSuccess({ course })),
      catchError(error => of(CoursesActions.createCourseFailure({ error: error.message })))
      )
    )
  ));

  updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.updateCourse),
    mergeMap(action => this.coursesService.updateCourse(action.course).pipe(
      map(course => CoursesActions.updateCourseSuccess({ course })),
      catchError(error => of(CoursesActions.updateCourseFailure({ error: error.message })))
      )
    )
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    mergeMap(action => this.coursesService.deleteCourse(action.id).pipe(
      map(() => CoursesActions.deleteCourseSuccess({ id: action.id })),
      catchError(error => of(CoursesActions.deleteCourseFailure({ error: error.message })))
    ))
  ));
}
