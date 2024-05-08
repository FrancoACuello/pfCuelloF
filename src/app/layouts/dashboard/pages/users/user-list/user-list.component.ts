import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUser } from '../models';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  authUser$: Observable<IUser | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$.pipe(
      map((user: IUser | null) => {
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



  logout(): void {
    this.authService.logout();
  }
}
