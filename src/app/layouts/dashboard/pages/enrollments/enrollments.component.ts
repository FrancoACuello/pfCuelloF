import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store';
import { ICourse } from '../courses/models';
import { IUser } from '../users/models';
import { EnrollmentService } from './enrollments.service';
import { selectAllCourses } from '../../../../store/courses/courses.selectors';
import { selectAllUsers } from '../../../../store/users/users.selectors';
import { selectEnrollments } from '../../../../store/enrollment/enrollment.selectors';
import { loadEnrollments, enrollStudent } from '../../../../store/enrollment/enrollment.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  selectedUserId: string = '';
  selectedCourseId: string = '';
  users$: Observable<IUser[]> = this.store.select(selectAllUsers); 
  courses$: Observable<ICourse[]> = this.store.select(selectAllCourses); 
  enrollments$: Observable<any[]> = this.store.select(selectEnrollments); 

  constructor(
    private store: Store<AppState>,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadEnrollments());
  }
  
  enrollUser(): void {
    if (this.selectedUserId && this.selectedCourseId) {
      this.store.dispatch(enrollStudent({ courseId: this.selectedCourseId, userId: this.selectedUserId }));
    }
  }

  getUserFirstName(userId: string): Observable<string> {
    return this.users$.pipe(
      map(users => {
        const user = users.find(u => u.id === userId);
        return user ? user.firstName : '';
      })
    );
  }

  getUserLastName(userId: string): Observable<string> {
    return this.users$.pipe(
      map(users => {
        const user = users.find(u => u.id === userId);
        return user ? user.lastName : '';
      })
    );
  }

  getCourseName(courseId: string): Observable<string> {
    return this.courses$.pipe(
      map(courses => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.name : '';
      })
    );
  }
}
