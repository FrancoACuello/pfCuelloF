import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../layouts/dashboard/pages/courses/course.service';
import * as CoursesActions from './courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '..';
import { ICourse } from '../../layouts/dashboard/pages/courses/models';


@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>,
  ) {}

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.loadCourses),
    mergeMap(() =>
       this.coursesService.getCourses().pipe(
      map((courses: ICourse[]) => CoursesActions.loadCoursesSuccess({ courses })),
      catchError(error => of(CoursesActions.loadCoursesFailure({ error })))
      )
    )
  ));


  createCourse$ = createEffect(() =>
     this.actions$.pipe(
    ofType(CoursesActions.createCourse),
    mergeMap(action =>
       this.coursesService.createCourse(action.course).pipe(
      map((course: ICourse) => CoursesActions.createCourseSuccess({ course })),
      catchError(error => of(CoursesActions.createCourseFailure({ error })))
      )
    )
  ));


  updateCourse$ = createEffect(() =>
     this.actions$.pipe(
    ofType(CoursesActions.updateCourse),
    mergeMap(action =>
       this.coursesService.updateCourse(action.course).pipe(
      map((course: ICourse) => CoursesActions.updateCourseSuccess({ course })),
      catchError(error => of(CoursesActions.updateCourseFailure({ error })))
      )
    )
  ));


  deleteCourse$ = createEffect(() =>
     this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    mergeMap(action =>
       this.coursesService.deleteCourse(action.id).pipe(
      map(() => CoursesActions.deleteCourseSuccess({ id: action.id })),
      catchError(error => of(CoursesActions.deleteCourseFailure({ error })))
    ))
  ));
}
