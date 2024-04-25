import { Component, OnInit } from '@angular/core';

import { CourseService } from '../course.service';

import { Course } from '../models';

@Component({
  selector: 'app-course-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService) {
    this.courses = [];
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
  }

  deleteCourse(course: Course): void {
    // Lógica para eliminar el curso
  }
}
