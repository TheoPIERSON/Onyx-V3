import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customers } from '../Models/customerModel';
import { CustomerService } from '../core/services/customer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Customer } from '../customerClass';
import { CustomerIdService } from '../core/services/customer-id.service';
import { Observable, first } from 'rxjs';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
})
export class CustomerCardComponent {
  public customers: Customers[] = [];

  selectedCustomer = new Customer({
    id: 0, // ou l'ID par défaut que vous préférez
    firstname: '',
    lastname: '',
    phoneNumber: '',
    mail: '',
    birthdate: '',
  });

  customers$: Observable<Customers[]> = this.customerService.getCustomers();

  constructor(
    private customerService: CustomerService,
    private customerIdService: CustomerIdService,
    public matDialog: MatDialog
  ) {}

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  openModalDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-delete-component';
    const modalDialog = this.matDialog.open(ModalDeleteComponent, dialogConfig);
  }

  onCardClick(id: number): void {
    console.log('Customer ID to search:', id);

    this.customerService.findCustomerById(id).subscribe(
      (res: Customers) => {
        this.selectedCustomer = res;
        this.customerIdService.setSelectedCustomerId(id);

        this.openModal(); // Ouvrez la modale avec les informations du client
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
  onDeleteCardClick(id: number): void {
    console.log('Customer ID to search:', id);
    this.customerService.findCustomerById(id).subscribe(
      (res: Customers) => {
        this.selectedCustomer = res;
        this.customerIdService.setSelectedCustomerId(id);
        this.openModalDelete(); // Ouvrez la modale avec les informations du client
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
}
