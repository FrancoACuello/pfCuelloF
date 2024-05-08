import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from './pages/users/models';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar el operador map
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  showFiller = false;

  mostrarComponent = true;

  authUser$: Observable<IUser | null>;

  authUserSubscription?: Subscription;

  isLoading = false; // Definir la propiedad isLoading

  constructor(
    private authService: AuthService,
     private router: Router) {
    // Agregar el operador map a authUser$
    this.authUser$ = this.authService.authUser$.pipe(
      map((user: IUser | null) => {
        // Aquí puedes realizar cualquier transformación necesaria en el usuario
        // Por ejemplo, convertir el nombre a mayúsculas
        if (user) {
          return {
            ...user,
            firstName: user.firstName.toUpperCase(),
            lastName: user.lastName.toUpperCase()
          };
        }
        return null;
      })
    );
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }

  toggleComponent(): void {
    // Mostrar el mensaje de carga
    this.isLoading = true;
  
    // Demorar unos segundos antes de cambiar el estado de mostrarComponent
    setTimeout(() => {
      // Cambiar el estado de mostrarComponent
      this.mostrarComponent = !this.mostrarComponent;
  
      // Ocultar el mensaje de carga después de cambiar el estado
      this.isLoading = false;
    }, 2000); // Demorar 2 segundos (puedes ajustar este valor según sea necesario)
  }
  
}
