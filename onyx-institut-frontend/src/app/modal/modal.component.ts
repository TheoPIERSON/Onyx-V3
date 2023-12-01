import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customers } from '../customer';
import { CustomerService } from '../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  public customers: Customers[] = [];

  constructor(
    private customerService: CustomerService,
    public matDialog: MatDialog
  ) {}

  public onUpdateCustomer(addForm: NgForm): void {
    document.getElementById('add-customer-btn');
    this.customerService.updateCustomer(addForm.value).subscribe(
      (response: Customers) => {
        console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
