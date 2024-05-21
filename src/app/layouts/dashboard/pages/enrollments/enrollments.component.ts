import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import * as CoursesSelectors from '../../../../store/courses/courses.selectors';
import * as UsersSelectors from '../../../../store/users/users.selectors';
import * as UsersActions from '../../../../store/users/users.actions';
import { EnrollmentsService } from './enrollments.service';
import { ICourse } from '../courses/models';
import { IEnrollment } from './models';
import { IUser } from '../users/models';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  selectedUserId: string = '';
  loadingCourses = true;
  loadingUsers = true;
  courses: ICourse[] = [];
  users: IUser[] = [];

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit(): void {
    

    this.store.dispatch(CoursesActions.loadCourses());
    this.store.dispatch(UsersActions.loadUsers());

    this.store.select(CoursesSelectors.selectAllCourses).subscribe(courses => {
      this.courses = courses;
      this.loadingCourses = false;
    });

    this.store.select(UsersSelectors.selectAllUsers).subscribe(users => {
      this.users = users;
      this.loadingUsers = false;
    });
  }

  enrollStudent(courseId: string, studentId: string): void {
    const enrollment: IEnrollment = {
      id: '0', 
      courseId,
      studentId
    };
  
    this.enrollmentsService.enrollStudent(enrollment).subscribe(
      () => {
        Swal.fire('¡Éxito!', 'El alumno ha sido inscrito en el curso.', 'success');
      },
      error => {
        Swal.fire('Error', 'Ocurrió un error al inscribir al alumno en el curso', 'error');
      }
    );
  }
  
  
}
