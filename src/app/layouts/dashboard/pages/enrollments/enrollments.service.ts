import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEnrollment } from './models';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  private baseAPIURL = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) {}

  getEnrollments(): Observable<IEnrollment[]> {
    return this.httpClient.get<IEnrollment[]>(`${this.baseAPIURL}/enrollments`);
  }

  createEnrollment(enrollment: IEnrollment): Observable<IEnrollment> {
    return this.httpClient.post<IEnrollment>(`${this.baseAPIURL}/enrollments`, enrollment);
  }

  deleteEnrollment(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseAPIURL}/enrollments/${id}`);
  }
}
