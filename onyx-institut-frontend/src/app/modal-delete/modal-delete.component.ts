import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerIdService } from 'src/app/core/services/customer-id.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/customerClass';
import { Customers } from 'src/app/Models/customerModel';

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
    email: '',
    birthdate: '',
  });
  dialogRef: any;
  refreshService: any;
  toast: any;

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
        this.selectedCustomer.email = res.email;
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
    this.customerService.deleteCustomer(this.selectedCustomer.id).subscribe(
      (res) => {
        // Fermez la modal une fois la suppression terminée
        this.dialogRef.close();
        // Émettez un événement de rafraîchissement
        this.refreshService.refreshComponent();
      },
      (error) => {
        this.toast.error({
          detail: 'ERREUR',
          summary:
            "Vous ne pouvez pas supprimer ce client, vérifiez qu'il ne soit pas associé à des rendez-vous.",
          sticky: true,
        });

        console.error('Erreur lors de la suppression du client : ', error);
      }
    );
  }
}
