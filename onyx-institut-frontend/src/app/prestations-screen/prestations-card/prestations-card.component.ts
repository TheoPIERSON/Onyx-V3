import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { Customers } from 'src/app/Models/customerModel';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { CustomerIdService } from 'src/app/core/services/customer-id.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/customerClass';
import { ModalDeleteComponent } from 'src/app/modal-delete/modal-delete.component';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-prestations-card',
  templateUrl: './prestations-card.component.html',
  styleUrls: ['./prestations-card.component.css'],
})
export class PrestationsCardComponent {
  typePrestation$: Observable<TypePrestation[]> =
    this.typePrestationService.fetchTypePrestation();

  constructor(
    private typePrestationService: TypePrestationService,
    private customerIdService: CustomerIdService,
    public matDialog: MatDialog,
    private fb: FormBuilder
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

    // this.typeService.findCustomerById(id).subscribe(
    //   (res: Customers) => {
    //     this.selectedCustomer = res;
    //     this.customerIdService.setSelectedCustomerId(id);

    //     this.openModal(); // Ouvrez la modale avec les informations du client
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error(error);
    //   }
    // );
  }
  onDeleteCardClick(id: number): void {
    // console.log('Customer ID to search:', id);
    // this.customerService.findCustomerById(id).subscribe(
    //   (res: Customers) => {
    //     this.selectedCustomer = res;
    //     this.customerIdService.setSelectedCustomerId(id);
    //     this.openModalDelete(); // Ouvrez la modale avec les informations du client
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error(error);
    //   }
    // );
  }
}
