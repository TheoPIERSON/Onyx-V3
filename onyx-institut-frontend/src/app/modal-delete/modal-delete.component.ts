import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerIdService } from 'src/app/core/services/customer-id.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/customerClass';
import { Customers } from 'src/app/customerModel';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent {
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

        console.log(this.selectedCustomer.firstname);
        console.log(this.selectedCustomer.lastname);

        // Vous pouvez également mettre à jour d'autres propriétés si nécessaire
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public onDeleteCustomer() {
    this.customerService
      .deleteCustomer(this.selectedCustomer.id)
      .subscribe((res) => {});
    console.log('customer deleted');
  }
}
