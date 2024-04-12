import { Component } from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {
  displayedColumns: string[] = ['id','nombreCompleto', 'firstName', 'lastName', 'email','role', 'createdAt','actionDelete','actionEdit'];
  

  users: IUser[]= [
    {
      id: 1,
      firstName: 'Franco',
      lastName: 'Cuello',
      email: 'Franco.cuello@gmail.com',
      role: 'ADMIN',
      createdAt: new Date()
  },
    {
      id: 2,
      firstName: 'Luca',
      lastName: 'Gaido',
      email: 'Luca.Gaido@gmail.com',
      role: 'USER',
      createdAt: new Date()
  },
    {
      id: 3,
      firstName: 'Martina',
      lastName: 'Martinangeli',
      email: 'Martina.martinangeli@gmail.com',
      role: 'USER',
      createdAt: new Date()
  },
    {
      id: 4,
      firstName: 'Gaston',
      lastName: 'Lopez',
      email: 'Gaston.Lopez@gmail.com',
      role: 'USER',
      createdAt: new Date()
  },
    {
      id: 5,
      firstName: 'Pablo',
      lastName: 'Rodriguez',
      email: 'Pablo.Rodriguez@gmail.com',
      role: 'ADMIN',
      createdAt: new Date()
  },
]

constructor(private matDialog : MatDialog) {}

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
          //Actualizar el usuario en array 
          this.users = this.users.map((u) => u.id === editingUser.id ? {...u, ...result} : u);
        } else {
          //Logica Crear usuario
          result.id = new Date().getTime().toString().substring(0, 3);
          result.createdAt = new Date();
          this.users = [...this.users,result];
        }
      }
    },
  });
}

// onDeleteUser(id:number): void{
//   if (confirm('Esta seguro?')) {
//   this.users = this.users.filter((u) => u.id != id)
// }};


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
      // Si el usuario confirma, eliminar el usuario
      this.users = this.users.filter((u) => u.id != id);
      Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado.',
        'success'
      );
    }
  });
}


}
