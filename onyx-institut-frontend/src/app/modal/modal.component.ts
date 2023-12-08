import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customers } from '../customerModel';
import { CustomerService } from '../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Customer } from '../customerClass';
import { ActivatedRoute } from '@angular/router';
import { CustomerIdService } from '../services/customer-id.service';

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
    id: 0, // ou l'ID par défaut que vous préférez
    firstname: '',
    lastname: '',
    phoneNumber: '',
    mail: '',
    birthdate: '',
  });

  constructor(
    private customerService: CustomerService,
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    public customerIdService: CustomerIdService
  ) {}

  ngOnInit() {
    console.log('ID in modal:', this.customerIdService.getSelectedCustomerId());
    // console.log(this.route.snapshot.params['customer.id']);
    // this.id = this.route.snapshot.params['id'];
    //this.getCustomer();
  }

  public getCustomer() {
    this.customerService.findCustomerById(this.id).subscribe(
      (res: Customers) => {
        this.selectedCustomer = res;
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
