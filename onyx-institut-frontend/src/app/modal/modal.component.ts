import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customers } from '../customerModel';
import { CustomerService } from '../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Customer } from '../customerClass';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  public customers: Customers[] = [];

  public selectedCustomer: Customer = new Customer({
    id_customer: 0, // ou l'ID par défaut que vous préférez
    firstname: '',
    lastname: '',
    phoneNumber: '',
    mail: '',
    birthdate: '',
  });

  constructor(
    private customerService: CustomerService,
    public matDialog: MatDialog
  ) {}

  public onUpdateCustomer(): void {
    this.customerService.updateCustomer(this.selectedCustomer).subscribe(
      (response: Customers) => {
        console.log('Update successful:', response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
