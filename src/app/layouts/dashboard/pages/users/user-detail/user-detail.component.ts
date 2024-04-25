import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { finalize, first, Observable } from 'rxjs';
import { IUser } from '../models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

  loading = true; // Variable para controlar la carga
  users$: Observable<IUser | undefined> | undefined; // Modificamos aquí

  constructor(private usersService: UsersService,
     private router : Router,
    private route: ActivatedRoute) {}


    ngOnInit(): void {
      this.loadData();
    }
  
    loadData(): void {
      const userId = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID del usuario de la URL
      if (userId) {
        this.users$ = this.usersService.getUserById(userId); // Cargar el usuario por su ID
        this.users$.subscribe({
          next: () => {
            this.loading = false; // Cambiar el estado de carga cuando los datos estén cargados
          },
          error: (error) => {
            console.error('Error loading user:', error);
            this.loading = false; // Cambiar el estado de carga en caso de error también
          }
        });
      } else {
        console.error('User ID not found in URL');
        this.loading = false; // Cambiar el estado de carga en caso de error
      }
    }
  
    cambiarParametro(): void {
      this.router.navigate(['dashboard', 'users', Math.random().toFixed(2)]);
    }
  }