import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth.component';
import { AppState } from '../../store';
import { login } from '../../store/auth/auth.actions';
import { selectAuthError } from '../../store/auth/auth.selectors';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with required fields', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(emailControl?.validator).toBe(Validators.required);
    expect(passwordControl?.validator).toBe(Validators.required);
  });

  it('should mark all form fields as touched when login with invalid form', () => {
    const loginSpy = spyOn(store, 'dispatch');
    component.loginForm.setValue({
      email: '',
      password: ''
    });
    component.login();
    expect(loginSpy).not.toHaveBeenCalled();
    expect(component.loginForm.get('email')?.touched).toBeTrue();
    expect(component.loginForm.get('password')?.touched).toBeTrue();
  });

  it('should dispatch login action when login with valid form', () => {
    const loginSpy = spyOn(store, 'dispatch');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password'
    });
    component.login();
    expect(loginSpy).toHaveBeenCalledWith(login({ loginData: { email: 'test@example.com', password: 'password' } }));
  });

});