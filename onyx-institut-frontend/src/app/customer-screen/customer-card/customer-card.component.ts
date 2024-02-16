import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customers } from '../../Models/customerModel';
import { CustomerService } from '../../core/services/customer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Customer } from '../../customerClass';
import { CustomerIdService } from '../../core/services/customer-id.service';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { ModalDeleteComponent } from '../../modal-delete/modal-delete.component';
import { FormBuilder } from '@angular/forms';
import { RefreshService } from 'src/app/core/services/Refresh/refresh.service';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
})
export class CustomerCardComponent {
  public customers: Customers[] = [];

  search = this.fb.nonNullable.group({
    firstname: [''],
    lastname: [''],
    phoneNumber: [''],
  });

  selectedCustomer = new Customer({
    id: 0, // ou l'ID par défaut que vous préférez
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    birthdate: '',
  });

  customers$: Observable<Customers[]> = this.getCustomers();
  refreshSubscription: any;

  constructor(
    private customerService: CustomerService,
    private customerIdService: CustomerIdService,
    public matDialog: MatDialog,
    private fb: FormBuilder,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    // Abonnez-vous aux événements de rafraîchissement
    this.refreshSubscription = this.refreshService
      .getRefreshObservable()
      .subscribe(() => {
        // Mettez ici le code que vous souhaitez exécuter lors du rafraîchissement du composant
        this.customers$ = this.getCustomers(); // Réinitialisez les données du composant
      });
  }

  ngOnDestroy(): void {
    // N'oubliez pas de vous désabonner pour éviter les fuites de mémoire
    this.refreshSubscription.unsubscribe();
  }

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

  private getCustomers(): Observable<Customer[]> {
    const customers$ = this.customerService.fetchCustomers();

    const search$ = combineLatest([
      this.search.controls.firstname.valueChanges.pipe(startWith('')),
      this.search.controls.lastname.valueChanges.pipe(startWith('')),
      this.search.controls.phoneNumber.valueChanges.pipe(startWith('')),
    ]);
    return combineLatest([customers$, search$]).pipe(
      map(([customers, [firstname, lastname, phoneNumber]]) =>
        customers.filter((customer) => {
          const isFirstnameMatching = customer.firstname
            .toLowerCase()
            .includes(firstname.toLowerCase());
          const isLastnameMatching = customer.lastname
            .toLowerCase()
            .includes(lastname.toLowerCase());
          const isPhoneNumberMatching = customer.phoneNumber
            .toLowerCase()
            .includes(phoneNumber.toLowerCase());

          return (
            isFirstnameMatching && isLastnameMatching && isPhoneNumberMatching
          );
        })
      )
    );
  }
}
