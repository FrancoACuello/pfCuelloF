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

  loading = true; 
  users$: Observable<IUser | undefined> | undefined; 

  constructor(private usersService: UsersService,
     private router : Router,
    private route: ActivatedRoute) {}


    ngOnInit(): void {
      this.loadData();
    }
  
    loadData(): void {
      const userId = Number(this.route.snapshot.paramMap.get('id')); 
      if (userId) {
        this.users$ = this.usersService.getUserById(userId); 
        this.users$.subscribe({
          next: () => {
            this.loading = false; 
          },
          error: (error) => {
            console.error('Error loading user:', error);
            this.loading = false; 
          }
        });
      } else {
        console.error('User ID not found in URL');
        this.loading = false; 
      }
    }
  
    cambiarParametro(): void {
      this.router.navigate(['dashboard', 'users', Math.random().toFixed(2)]);
    }
  }