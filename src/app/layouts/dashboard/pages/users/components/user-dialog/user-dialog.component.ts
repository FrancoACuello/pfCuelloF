import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
userForm :FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IUser
  ) {
    this.userForm = this.formBuilder.group({
      firstName:['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', [Validators.required]],
    })

    if (editingUser) {
    this.userForm.patchValue(editingUser);
    }
  }



  onSave(): void{
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } 
    //Aqui le mandamos los datos al componente desde donde se abrio
    else {
      //si el formulario es valido
      this.matDialogRef.close(this.userForm.value)
    }
  }
}
