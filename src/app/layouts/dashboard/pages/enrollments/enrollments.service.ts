import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEnrollment } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrollments: IEnrollment[] = [];

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<IEnrollment[]> {
    return this.http.get<IEnrollment[]>(`${environment.baseAPIURL}/enrollments`);
  }

  enrollStudent(courseId: string, userId: string): Observable<IEnrollment> {
    const enrollment = { courseId, userId };
    return this.http.post<IEnrollment>(`${environment.baseAPIURL}/enrollments`, enrollment);
  }

  

}
