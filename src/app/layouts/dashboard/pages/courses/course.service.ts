import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    { id: 1, name: 'Angular', description: 'Curso avanzado de Angular', duration: 60 },
    { id: 2, name: 'React', description: 'Curso completo de React', duration: 45 },
    { id: 3, name: 'Vue.js', description: 'Introducción a Vue.js', duration: 30 }
  ];

  constructor() {}

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }

  addCourse(course: Course): void {
    // Agregar el nuevo curso al arreglo de cursos
    this.courses.push(course);
  }

  updateCourse(course: Course): void {
    // Actualizar el curso existente en el arreglo de cursos
    const index = this.courses.findIndex(c => c.id === course.id);
    if (index !== -1) {
      this.courses[index] = course;
    }
  }

  deleteCourse(id: number): void {
    // Eliminar el curso con el ID proporcionado del arreglo de cursos
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
