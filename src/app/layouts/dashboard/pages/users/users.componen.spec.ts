import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import * as UsersActions from '../../../../store/users/users.actions';
import { AppState } from '../../../../store';
import { IUser } from './models';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: Store<AppState>;
  let matDialog: MatDialog;

  const mockUser: IUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'USER',
    createdAt: new Date() 
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [StoreModule.forRoot({})],
      providers: [MatDialog, Store]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    matDialog = TestBed.inject(MatDialog);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();
    spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of(null) } as any);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers action on initialization', () => {
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it('should open user dialog when openDialog is called', () => {
    component.openDialog();
    expect(matDialog.open).toHaveBeenCalledWith(UserDialogComponent, { data: undefined });
  });

  it('should dispatch createUser action when user dialog returns a new user', () => {
    const newUser: IUser = { 
      id: '2', 
      firstName: 'Test', 
      lastName: 'User', 
      email: 'test.user@example.com', 
      role: 'ADMIN', 
      createdAt: new Date() 
    };    spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of(newUser) } as any);

    component.openDialog();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.createUser({ user: newUser }));
  });

  it('should dispatch updateUser action when user dialog returns an edited user', () => {
    const editedUser: IUser = { id: '1', firstName: 'Updated', lastName: 'User', email: 'updated.user@example.com', role: 'ADMIN', createdAt: new Date() };
    spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of(editedUser) } as any);

    component.openDialog(mockUser);

    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.updateUser({ user: editedUser }));
  });

  it('should dispatch deleteUser action when onDeleteUser is called', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDeleteUser('1');

    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.deleteUser({ id: '1' }));
  });
});
