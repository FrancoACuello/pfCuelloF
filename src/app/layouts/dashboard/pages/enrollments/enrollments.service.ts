import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { IEnrollment } from './models';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private baseAPIURL = environment.baseAPIURL;

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<IEnrollment[]> {
    return this.http.get<IEnrollment[]>(`${this.baseAPIURL}/enrollments`);
  }

  enrollStudent(courseId: string, userId: string): Observable<IEnrollment> {
    return this.http.post<IEnrollment>(`${this.baseAPIURL}/enrollments`, { courseId, userId });
  }

  deleteEnrollment(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIURL}/enrollments/${userId}`).pipe(
      catchError(error => {
        console.error('Error deleting enrollment:', error);
        return throwError('Error deleting enrollment');
      })
    );
  }
}
