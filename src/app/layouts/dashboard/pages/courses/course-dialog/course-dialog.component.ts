import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICourse } from '../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourse,
    private fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      duration: [data?.duration || '', Validators.required],
      instructor: [data?.instructor || '', Validators.required],
      startDate: [data?.startDate || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
