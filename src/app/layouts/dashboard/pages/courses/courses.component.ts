import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import * as CoursesSelectors from '../../../../store/courses/courses.selectors';
import { ICourse } from './models';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  loading = true;
  courses: ICourse[] = [];
  error: string | null = null;

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());

    this.store.select(CoursesSelectors.selectAllCourses).subscribe(courses => {
      this.courses = courses;
    });

    this.store.select(CoursesSelectors.selectCoursesLoading).subscribe(loading => {
      this.loading = loading;
    });

    this.store.select(CoursesSelectors.selectCoursesError).subscribe(error => {
      this.error = error;
      if (error) {
        Swal.fire('Error', 'Ocurrió un error al cargar los cursos', 'error');
      }
    });
  }

  openDialog(editingCourse?: ICourse): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: editingCourse,
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (editingCourse) {
            const updatedCourse: ICourse = { ...editingCourse, ...result };
            this.store.dispatch(CoursesActions.updateCourse({ course: updatedCourse }));
          } else {
            const newCourse: ICourse = result;
            this.store.dispatch(CoursesActions.createCourse({ course: newCourse }));
          }
        }
      });
  }

  onDeleteCourse(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.store.dispatch(CoursesActions.deleteCourse({ id }));
        Swal.fire('Eliminado!', 'El curso ha sido eliminado.', 'success');
      }
    });
  }
}
