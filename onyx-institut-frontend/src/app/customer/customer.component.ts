import { Component, OnInit } from '@angular/core';
import { Customers } from '../customer';
import { CustomerService } from '../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {}
