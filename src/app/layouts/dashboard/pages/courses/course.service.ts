import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from './models/index'
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseAPIURL = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${environment.baseAPIURL}/courses`);
  }

  getCourseById(id: string): Observable<ICourse> {
    return this.httpClient.get<ICourse>(`${environment.baseAPIURL}/courses/${id}`);
  }

  createCourse(course: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>(`${environment.baseAPIURL}/courses`, course);
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    return this.httpClient.put<ICourse>(`${environment.baseAPIURL}/courses/${course.id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/courses/${id}`);
  }
  
  updateCourseWithEnrollments(course: ICourse): Observable<ICourse> {
    return this.httpClient.put<ICourse>(`${environment.baseAPIURL}/courses/${course.id}`, course);
  }
  
}
