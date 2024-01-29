import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../../Models/customerModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiServerUrl}/customer/all`);
  }

  public addCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customer/add`,
      customer
    );
  }

  // public updateCustomer(customer: Customers): Observable<Customers> {
  //   return this.http.put<Customers>(
  //     `${this.apiServerUrl}/customers/update`,
  //     customer
  //   );
  // }

  public findCustomerById(id: number): Observable<Customers> {
    return this.http.get<Customers>(`${this.apiServerUrl}/customer/${id}`);
  }

  public updateCustomer(customer: Customers): Observable<Customers> {
    const url = `${this.apiServerUrl}/customer/update/${customer.id}`;
    return this.http.put<Customers>(url, customer);
  }

  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${id}`);
  }
}
