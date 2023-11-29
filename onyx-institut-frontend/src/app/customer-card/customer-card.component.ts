import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customers } from '../customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
})
export class CustomerCardComponent implements OnInit {
  public customers: Customers[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response: Customers[]) => {
        this.customers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
