import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  characters$: Observable<any> = new Observable<any>(); // Inicialización en el constructor

  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.characters$ = this.apiService.getData(); // Asignación del valor
  }
}