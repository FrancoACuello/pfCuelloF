import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEnrollment } from './models';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  private baseAPIURL = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) {}

  enrollStudent(enrollment: IEnrollment): Observable<IEnrollment> {
    return this.httpClient.post<IEnrollment>(`${environment.baseAPIURL}/enrollments`, enrollment);
  }
}