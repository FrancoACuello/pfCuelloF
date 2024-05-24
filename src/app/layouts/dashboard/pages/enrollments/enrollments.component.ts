import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store';
import { ICourse } from '../courses/models';
import { IUser } from '../users/models';
import { selectAllCourses } from '../../../../store/courses/courses.selectors';
import { selectAllUsers } from '../../../../store/users/users.selectors';
import { selectEnrollments } from '../../../../store/enrollment/enrollment.selectors';
import { enrollStudent, loadEnrollments,updateEnrollment } from '../../../../store/enrollment/enrollment.actions';
import { loadCourses } from '../../../../store/courses/courses.actions';
import { loadUsers } from '../../../../store/users/users.actions';
import { map, tap } from 'rxjs/operators';
import { IEnrollment } from './models';
import { EnrollmentService } from './enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  selectedUserId: string = '';
  selectedCourseId: string = '';
  users$: Observable<IUser[]>;
  courses$: Observable<ICourse[]>;
  enrollments$: Observable<IEnrollment[]>;
  courseNames: { [courseId: string]: string } = {};
  userNames: { [userId: string]: string } = {}; 

  constructor(
    private store: Store<AppState>,
    private enrollmentService: EnrollmentService
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.courses$ = this.store.select(selectAllCourses);
    this.enrollments$ = this.store.select(selectEnrollments);
  }

  ngOnInit(): void {
    this.store.dispatch(loadEnrollments());
    this.store.dispatch(loadCourses());
    this.store.dispatch(loadUsers());

    this.users$.subscribe(users => {
      users.forEach(user => {
        this.userNames[user.id] = `${user.firstName} ${user.lastName}`;
      });
    });

    this.courses$.subscribe(courses => {
      courses.forEach(course => {
        this.courseNames[course.id] = course.name;
      });
    });
  }

  getUserName(userId: string): string {
    return this.userNames[userId] || '';
  }

  getCourseNames(courseId: string): string {
    return this.courseNames[courseId] || '';
  }

  enrollUser(): void {
    if (this.selectedUserId && this.selectedCourseId) {
      // Verificar si el usuario ya está inscrito en el curso
      this.enrollments$.pipe(
        map(enrollments => enrollments.some(enrollment => enrollment.userId === this.selectedUserId && enrollment.courseId === this.selectedCourseId)),
        tap(alreadyEnrolled => {
          if (alreadyEnrolled) {
          } else {
            this.store.dispatch(enrollStudent({ courseId: this.selectedCourseId, userId: this.selectedUserId }));
          }
        })
      ).subscribe();
    }
  }

  getEnrollmentsForCourse(courseId: string): Observable<IEnrollment[]> {
    return this.enrollments$.pipe(
      map(enrollments => enrollments.filter(enrollment => enrollment.courseId === courseId))
    );
  }

  selectedEnrollment: IEnrollment | null = null;

  editEnrollment(enrollment: IEnrollment): void {
    this.selectedEnrollment = enrollment;
  }

  closeDialog(): void {
    this.selectedEnrollment = null;
  }

  deleteEnrollment(enrollmentId: string): void {
    this.enrollmentService.deleteEnrollment(enrollmentId).subscribe({
      next: () => {
        this.store.dispatch(loadEnrollments());
      },
      error: (error: any) => {
        console.error('Error deleting enrollment:', error);
      }
    });
  }
  

  updateEnrollmentData(newData: Partial<IEnrollment>): void {
    if (this.selectedEnrollment) {
      const updatedEnrollment: Partial<IEnrollment> = { ...this.selectedEnrollment, ...newData };
      this.store.dispatch(updateEnrollment({ enrollmentId: this.selectedEnrollment.id, updatedEnrollment }));
    }
  }
}
