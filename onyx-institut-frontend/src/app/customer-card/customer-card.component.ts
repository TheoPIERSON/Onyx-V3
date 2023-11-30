import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customers } from '../customer';
import { CustomerService } from '../services/customer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
})
export class CustomerCardComponent implements OnInit {
  public customers: Customers[] = [];

  constructor(
    private customerService: CustomerService,
    public matDialog: MatDialog
  ) {}

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

  // public updateCustomer(customers: Customers): void {
  //   this.customerService.updateCustomer(customers).subscribe(
  //     (response: Customers) => {
  //       console.log(response);
  //       this.getCustomers();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.closeOnNavigation = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
