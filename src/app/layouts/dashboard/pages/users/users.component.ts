import { Component, OnInit } from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import {
  BehaviorSubject,
  delay,
  filter,
  first,
  forkJoin,
  map,
  Observable,
  of,
  skip,
  Subject,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';
 import { UsersService } from './users.service';
 import { HttpClient } from '@angular/common/http';


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
  private httpClient : HttpClient,
  private matDialog : MatDialog,
  private userService: UsersService
) {}

ngOnInit(): void {
  this.loading = true;
  this.userService.getUsers().subscribe({
    next: (users) => {
      console.log('next: ', users);
      this.users = users;
    },
    error: (err) => {
      console.log('error: ', err);
      Swal.fire('Error', 'Ocurrio un error', 'error');
    },
    complete: () => {
      console.log('complete');
      this.loading = false;
    },
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
          this.users = this.users.map((u) => u.id === editingUser.id ? {...u, ...result} : u);
        } else {
          this.userService.createUser(result).subscribe({
            next:(userCreated) => {
              this.users = [...this.users,userCreated]
            }
          })
          // result.id = new Date().getTime().toString().substring(0, 3);
          result.createdAt = new Date();
          // this.users = [...this.users,result];
        }
      }
    },
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
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteAndUpdateUsers(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id.toString() !== id);
          Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
        },
        error: (err) => {
          console.log('Error al eliminar usuario: ', err);
          Swal.fire('Error', 'Ocurrió un error al eliminar el usuario', 'error');
        }
      });
    }
  });
}



}
