import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../customerModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiServerUrl}/customers/all`);
  }

  public addCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customers/add`,
      customer
    );
  }

  // public updateCustomer(customer: Customers): Observable<Customers> {
  //   return this.http.put<Customers>(
  //     `${this.apiServerUrl}/customers/update`,
  //     customer
  //   );
  // }

  public updateCustomer(customer: Customers): Observable<Customers> {
    const url = `${this.apiServerUrl}/customers/update/${customer.id_customer}`;

    return this.http.put<Customers>(url, customer);
  }

  public deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/customers/delete/${customerId}`
    );
  }
}
