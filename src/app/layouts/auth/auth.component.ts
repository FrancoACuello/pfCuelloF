import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import { login } from '../../store/auth/auth.actions';
import { selectAuthError } from '../../store/auth/auth.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectAuthError).subscribe((error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Estos datos no son correctos, intente de nuevo'
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.store.dispatch(login({ loginData: this.loginForm.getRawValue() }));
    }
  }
}
