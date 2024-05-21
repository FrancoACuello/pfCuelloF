import { Component, OnInit } from '@angular/core';
import { CreateUserPayload, IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
 import { UsersService } from './users.service';
 import { HttpClient } from '@angular/common/http';


import { Store } from '@ngrx/store';
import * as UsersActions from '../../../../store/users/users.actions';
import * as UsersSelectors from '../../../../store/users/users.selectors';
import { AppState, UserActions } from '../../../../store';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', './user-detail/user-detail.component.scss'],
})

export class UsersComponent implements OnInit {
  loading = true;
  users: IUser[] = [];
  displayedColumns: string[] = ['id',
  'nombreCompleto',
   'firstName',
    'lastName',
    'email',
    'role',
     'createdAt',
     'actions'];
  

constructor(
  private store : Store<AppState>,
  private httpClient : HttpClient,
  private matDialog : MatDialog,
  private userService: UsersService
) {}

ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());

    this.store.select(UsersSelectors.selectAllUsers).subscribe(users => {
      this.users = users;
      this.loading = false;
    });

    this.store.select(UsersSelectors.selectUsersLoading).subscribe(loading => {
      this.loading = loading;
    });

    this.store.select(UsersSelectors.selectUsersError).subscribe(error => {
      if (error) {
        Swal.fire('Error', 'Ocurrio un  error al cargar los usuarios', 'error');
      }
    });

}


openDialog(editingUser?: IUser): void {
  this.matDialog
  .open(UserDialogComponent, {
    data: editingUser,
  })
  .afterClosed()
  .subscribe({
    next:(result) => {
      if (result) {

        if (editingUser) {
          const updateUser: IUser = {...editingUser, ...result };
          this.store.dispatch(UsersActions.updateUser({ user: updateUser}));
          // this.users = this.users.map((u) => u.id === editingUser.id ? {...u, ...result} : u);
        } else {
          const payload: CreateUserPayload = result;
          this.store.dispatch(UsersActions.createUser({ payload}));
            }
          result.createdAt = new Date();
        }
      }
    },
  );
}

onDeleteUser(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.store.dispatch(UsersActions.deleteUser({ id }));
      Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
    }
  });
}



}
