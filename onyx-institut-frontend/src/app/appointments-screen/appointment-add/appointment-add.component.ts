import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, combineLatest, map } from 'rxjs';
import { Appointments } from 'src/app/Models/appointmentModel';
import { Type_prestation } from 'src/app/Models/classes/type_prestation_class';

import { Customers } from 'src/app/Models/customerModel';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/customerClass';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { TypePrestationIdService } from 'src/app/core/services/Type_prestation/type-prestation-id.service';
import { AppointmentIdService } from 'src/app/core/services/AppointmentService/appointment-id.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css'],
})
export class AppointmentAddComponent {
  // Recupère le form group du html
  search = this.fb.nonNullable.group({
    lastname: [''],
    firstname: [''],
    startDate: new Date(),
    endDate: new Date(),
    title: [''],
  });

  // Créer un nouvel object Customer
  selectedCustomer = new Customer({
    id: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    birthdate: '',
  });

  // Créer un nouvel object Type Prestation
  selectedTypePrestation = new Type_prestation({
    id: 0,
    title: '',
    description: '',
    duration: 0,
    price: 0,
  });

  // Récupère tout les customers et prestations de la base de données pour les utiliser
  customers$: Observable<Customers[]> = this.getCustomers();
  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestations();

  constructor(
    private customerService: CustomerService,
    private typePrestationService: TypePrestationService,
    private typePrestationIdService: TypePrestationIdService,
    private appointmentService: AppointmentService,
    private appointmentIdService: AppointmentIdService,
    public matDialog: MatDialog,
    private fb: FormBuilder
  ) {}

  // Permet de chercher les customers avec la barre de recherche
  private getCustomers(): Observable<Customer[]> {
    const customers$ = this.customerService.fetchCustomers();

    const search$ = combineLatest([this.search.controls.lastname.valueChanges]);
    return combineLatest([customers$, search$]).pipe(
      map(([customers, [lastname]]) =>
        customers.filter((customer) => {
          const isLastnameMatching = customer.lastname
            .toLowerCase()
            .includes(lastname.toLowerCase());

          return isLastnameMatching;
        })
      )
    );
  }
  // Selectionne le customer dans le formulaire
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.search.patchValue({
      lastname: customer.lastname,
    });
  }

  // Permet de chercher les type de prestations avec la barre de recherche
  private getTypePrestations(): Observable<Type_prestation[]> {
    const type_prestations$ = this.typePrestationService.fetchTypePrestation();

    const search$ = combineLatest([this.search.controls.title.valueChanges]);
    return combineLatest([type_prestations$, search$]).pipe(
      map(([typePrestations, [title]]) =>
        typePrestations.filter((typePrestation) => {
          const isTitleMatching = typePrestation.title
            .toLowerCase()
            .includes(title.toLowerCase());

          return isTitleMatching;
        })
      )
    );
  }
  // Selectionne le customer dans le formulaire
  selectTypePrestation(typePrestation: Type_prestation): void {
    this.selectedTypePrestation = typePrestation;
    this.search.patchValue({
      title: typePrestation.title,
    });
  }

  testClick(): void {
    let startDate: Date;
    if (typeof this.search.value.startDate === 'string') {
      startDate = new Date(this.search.value.startDate);
    } else {
      startDate = this.search.value.startDate ?? new Date();
    }
    const endDate: Date = new Date(startDate);
    endDate.setMinutes(
      startDate.getMinutes() + this.selectedTypePrestation.duration
    );
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(
      AppointmentModalComponent,
      dialogConfig
    );
  }

  //Ajoute le nouvel appointment dans la base de données
  public onAddAppointment(): void {
    let startDate: Date;
    if (typeof this.search.value.startDate === 'string') {
      startDate = new Date(this.search.value.startDate);
    } else {
      startDate = this.search.value.startDate ?? new Date();
    }
    const endDate: Date = new Date(startDate);
    endDate.setMinutes(
      startDate.getMinutes() + this.selectedTypePrestation.duration
    );
    const appointmentObj: Appointments = {
      id: 0,
      appointmentStartDate: startDate,
      appointmentEndDate: endDate,
      customer: {
        id: this.selectedCustomer.id,
        firstname: this.selectedCustomer.firstname,
        lastname: this.selectedCustomer.lastname,
        phoneNumber: this.selectedCustomer.phoneNumber,
        email: this.selectedCustomer.email,
        birthdate: this.selectedCustomer.birthdate,
      },
    };

    this.appointmentService
      .addAppointment(appointmentObj)
      .subscribe((response: Appointments) => {});
    this.typePrestationService
      .findById(this.selectedTypePrestation.id)
      .subscribe(
        (res: TypePrestation) => {
          this.selectedTypePrestation = res;
          this.typePrestationIdService.setSelectedTypePrestationId(
            this.selectedTypePrestation.id
          );
          this.openModal(); // Ouvrez la modale avec les informations du client
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }
}
