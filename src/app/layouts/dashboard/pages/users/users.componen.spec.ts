import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa MatProgressSpinnerModule
import { of } from 'rxjs';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { IUser } from './models';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UsersService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule, // Asegúrate de importar MatProgressSpinnerModule aquí
      ],
      providers: [UsersService, MatDialog]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los usuarios durante la inicialización', () => {
    const mockUsers: IUser[] = [
      { id: '1', firstName: 'Franco', lastName: 'Apellido', email: 'usuario1@example.com', role: 'ADMIN', createdAt: new Date() }
      // Agrega las propiedades faltantes en tus objetos de prueba
    ];
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers)); // Simula getUsers devolviendo datos de prueba
  
    component.ngOnInit(); // Llama al método ngOnInit
  
    expect(userService.getUsers).toHaveBeenCalled(); // Verifica que getUsers haya sido llamado
    expect(component.loading).toBeFalse(); // Verifica que loading sea falso después de cargar los usuarios
    expect(component.users).toEqual(mockUsers); // Verifica que los usuarios cargados sean los esperados
  });
});




