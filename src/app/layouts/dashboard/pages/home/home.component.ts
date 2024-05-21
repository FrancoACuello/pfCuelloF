import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showWelcomeMessage = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showWelcomeMessage = false;
      this.router.navigate(['/dashboard/users']);
    }, 3000); 
  }
}
