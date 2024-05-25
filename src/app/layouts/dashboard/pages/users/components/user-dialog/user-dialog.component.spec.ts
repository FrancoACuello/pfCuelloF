import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog.component';
import { IUser } from '../../models';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<UserDialogComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<UserDialogComponent>>('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UserDialogComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UserDialogComponent>>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values when no user is passed', () => {
    expect(component.userForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      role: 'USER'
    });
  });

  it('should initialize the form with user data when a user is passed', () => {
    const editingUser: IUser = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
      createdAt: new Date() // Añadir propiedad creada
    };

    component = new UserDialogComponent(
      new FormBuilder(),
      matDialogRef,
      editingUser
    );
    fixture.detectChanges();

    expect(component.userForm.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN'
    });
  });

  it('should mark all fields as touched when onSave is called with invalid form', () => {
    const spyOnMarkAllAsTouched = spyOn(component.userForm, 'markAllAsTouched');
    component.userForm.controls['email'].setValue('invalid-email');
    component.onSave();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });

  it('should close the dialog with form data when onSave is called with valid form', () => {
    component.userForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      role: 'USER'
    });
    component.onSave();
    expect(matDialogRef.close).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      role: 'USER'
    });
  });
});
