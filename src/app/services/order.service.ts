import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACK_API_URL } from '../app-injection-tokens';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(BACK_API_URL) private apiUrl: string,
  ) { }

  getAllOrders(): Observable<Order[]> {
    this.authService.updateToken(); // костыль
    return this.http.get<Order[]>(this.apiUrl + "api/order/GetAllOrders")
  }
  
  getOrdersByUser(): Observable<Order[]> { 
    this.authService.updateToken(); // костыль
    return this.http.get<Order[]>(this.apiUrl + "api/order/GetOrdersByUser")
  }

}
