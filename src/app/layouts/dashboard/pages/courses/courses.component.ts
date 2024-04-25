import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './models';
import { CourseService } from './course.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | undefined;
  isNewCourse: boolean = false;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
    this.isNewCourse = false;
  }

  addCourse(): void {
    this.selectedCourse = { id: 0, name: '', description: '', duration: 0 };
    this.isNewCourse = true;
  }

  saveCourse(): void {
    if (this.isNewCourse) {
      this.courseService.addCourse(this.selectedCourse!);
    } else {
      this.courseService.updateCourse(this.selectedCourse!);
    }
    this.loadCourses();
    this.selectedCourse = undefined;
  }

 confirmDeleteCourse(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this course!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteCourse(id);
    }
  });
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id);
    this.loadCourses();
    this.selectedCourse = undefined;
    Swal.fire(
      'Deleted!',
      'Your course has been deleted.',
      'success'
    );
  }
}