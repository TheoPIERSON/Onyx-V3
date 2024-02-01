import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerService } from '../core/services/customer.service';
import { Customers } from '../Models/customerModel';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../customerClass';
import { Appointments } from '../Models/appointmentModel';
import { AppointmentService } from '../core/services/AppointmentService/appointment.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  // Recupère le form group du html
  search = this.fb.nonNullable.group({
    firstname: [''],
    lastname: [''],
    startDate: new Date(),
    endDate: new Date(),
  });
  // Créer un nouvel object Customer
  selectedCustomer = new Customer({
    id: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    mail: '',
    birthdate: '',
  });
  // Récupère tout les customers de la base de données pour les utiliser
  customers$: Observable<Customers[]> = this.getCustomers();

  constructor(
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    public matDialog: MatDialog,
    private fb: FormBuilder
  ) {}

  // Permet de chercher les customers avec la barre de recherche
  private getCustomers(): Observable<Customer[]> {
    const customers$ = this.customerService.fetchCustomers();

    const search$ = combineLatest([
      this.search.controls.firstname.valueChanges,
      this.search.controls.lastname.valueChanges,
    ]);
    return combineLatest([customers$, search$]).pipe(
      map(([customers, [firstname, lastname]]) =>
        customers.filter((customer) => {
          const isFirstnameMatching = customer.firstname
            .toLowerCase()
            .includes(firstname.toLowerCase());
          const isLastnameMatching = customer.lastname
            .toLowerCase()
            .includes(lastname.toLowerCase());

          return isFirstnameMatching && isLastnameMatching;
        })
      )
    );
  }
  // Selectionne le customer dans le formulaire
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log(this.selectedCustomer);
    this.search.patchValue({
      firstname: customer.firstname,
      lastname: customer.lastname,
    });
    console.log(this.selectedCustomer.id);
    console.log('nouvelle date ' + this.search.value.endDate);
  }

  //Ajoute le nouvel appointment dans la base de données
  public onAddAppointment(): void {
    // Récupérer la date sélectionnée dans le formulaire
    const selectedStartDate: Date = this.search.value.startDate ?? new Date();
    const selectedEndDate: Date = this.search.value.endDate ?? new Date();

    // Afficher la date dans la console
    console.log('La date de début sélectionnée est :', selectedStartDate);
    console.log('La date de fin sélectionnée est :', selectedEndDate);

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
        mail: this.selectedCustomer.mail,
        birthdate: this.selectedCustomer.birthdate,
      },
    };
    console.log("l'id selectionné est : " + appointmentObj.customer.id);

    console.log(appointmentObj.appointmentEndDate);

    this.appointmentService
      .addAppointment(appointmentObj)
      .subscribe((response: Appointments) => {
        console.log(response);
      });
  }
}
