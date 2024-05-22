// src/app/layouts/dashboard/pages/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import * as UsersActions from '../../../../store/users/users.actions';
import * as UsersSelectors from '../../../../store/users/users.selectors';
import { IUser } from './models';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading = true;
  users: IUser[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['id','nombreCompleto','firstName', 'lastName', 'email','role', 'actions']; 



  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());

    this.store.select(UsersSelectors.selectAllUsers).subscribe(users => {
      this.users = users;
    });

    this.store.select(UsersSelectors.selectUsersLoading).subscribe(loading => {
      this.loading = loading;
    });

    this.store.select(UsersSelectors.selectUsersError).subscribe(error => {
      this.error = error;
      if (error) {
        Swal.fire('Error', 'Ocurrió un error al cargar los usuarios', 'error');
      }
    });
  }

  openDialog(editingUser?: IUser): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (editingUser) {
            const updatedUser: IUser = { ...editingUser, ...result };
            this.store.dispatch(UsersActions.updateUser({ user: updatedUser }));
          } else {
            const newUser: IUser = result;
            this.store.dispatch(UsersActions.createUser({ user: newUser }));
          }
        }
      });
  }

  onDeleteUser(id: string): void {
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
        this.store.dispatch(UsersActions.deleteUser({ id }));
        Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
  }
}
