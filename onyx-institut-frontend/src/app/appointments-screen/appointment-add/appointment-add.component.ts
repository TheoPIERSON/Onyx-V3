import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, combineLatest, map } from 'rxjs';
import { Appointments } from 'src/app/Models/appointmentModel';
import { Type_prestation } from 'src/app/Models/classes/type_prestation_class';

import { Customers } from 'src/app/Models/customerModel';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/customerClass';

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

  // Créer un nouvel object Customer
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
    private appointmentService: AppointmentService,
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
    console.log(customer.lastname);
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
    console.log(this.selectedTypePrestation.duration);
  }

  testClick(): void {
    const startDate: Date = this.search.value.startDate ?? new Date();
    const endDate: Date = new Date(startDate);

    endDate.setMinutes(
      startDate.getMinutes() + this.selectedTypePrestation.duration
    );
    console.log(startDate);

    console.log(endDate);
  }

  //Ajoute le nouvel appointment dans la base de données
  public onAddAppointment(): void {
    // this.search.value.startDate + this.selectedTypePrestation.duration

    // Récupérer la date sélectionnée dans le formulaire
    let selectedStartDate: Date = this.search.value.startDate ?? new Date();

    // Vérifier si selectedStartDate est une date valide
    if (
      !(
        selectedStartDate instanceof Date && !isNaN(selectedStartDate.getTime())
      )
    ) {
      // Si ce n'est pas une date valide, utiliser la date actuelle
      selectedStartDate = new Date();
    }

    // Créer la date de fin en ajoutant la durée à la date de début
    const selectedEndDate: Date = new Date(
      selectedStartDate.getTime() + this.selectedTypePrestation.duration * 60000
    );

    // Reste du code...
    const appointmentObj: Appointments = {
      id: 0,
      appointmentStartDate: selectedStartDate,
      appointmentEndDate: selectedEndDate,
      customer: {
        id: this.selectedCustomer.id,
        firstname: this.selectedCustomer.firstname,
        lastname: this.selectedCustomer.lastname,
        phoneNumber: this.selectedCustomer.phoneNumber,
        email: this.selectedCustomer.email,
        birthdate: this.selectedCustomer.birthdate,
      },
      // typePrestation: {
      //   id: this.selectedTypePrestation.id,
      //   title: this.selectedTypePrestation.title,
      //   description: this.selectedTypePrestation.description,
      //   duration: this.selectedTypePrestation.duration,
      //   price: this.selectedTypePrestation.price,
      // },
    };
    this.appointmentService
      .addAppointment(appointmentObj)
      .subscribe((response: Appointments) => {});
    //window.location.reload();
    console.log(appointmentObj.appointmentStartDate);
    console.log(appointmentObj.customer.firstname);

    console.log(appointmentObj.appointmentEndDate);
    console.log(appointmentObj);
  }
}
