import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerIdService } from 'src/app/core/services/customer-id.service';
import { Customer } from 'src/app/customerClass';
import { Customers } from 'src/app/Models/customerModel';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public customers: Customers[] = [];
  id: any;
  data: any;
  selectedCustomer = new Customer({
    id: this.customerIdService.getSelectedCustomerId(),
    firstname: '',
    lastname: '',
    phoneNumber: '',
    mail: '',
    birthdate: '',
  });

  constructor(
    private customerService: CustomerService,
    public matDialog: MatDialog,
    public customerIdService: CustomerIdService
  ) {}

  ngOnInit() {
    console.log('ID in modal:', this.customerIdService.getSelectedCustomerId());
    this.getCustomer();

    console.log(this.selectedCustomer.id);
  }

  public getCustomer() {
    this.customerService.findCustomerById(this.selectedCustomer.id).subscribe(
      (res: Customers) => {
        // Assurez-vous que les propriétés que vous souhaitez utiliser sont définies
        this.selectedCustomer.firstname = res.firstname;
        this.selectedCustomer.lastname = res.lastname;
        this.selectedCustomer.phoneNumber = res.phoneNumber;
        this.selectedCustomer.mail = res.mail;
        this.selectedCustomer.birthdate = res.birthdate;

        // Vous pouvez également mettre à jour d'autres propriétés si nécessaire
        console.log(this.selectedCustomer.firstname);
        console.log(this.selectedCustomer.lastname);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public onUpdateCustomer() {
    this.customerService
      .updateCustomer(this.selectedCustomer)
      .subscribe((res) => {});
  }
}
