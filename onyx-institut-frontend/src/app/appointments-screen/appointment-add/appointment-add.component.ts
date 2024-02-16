import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, combineLatest, map } from 'rxjs';
import { Appointments } from 'src/app/Models/appointmentModel';

import { Customers } from 'src/app/Models/customerModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
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
    email: '',
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
    this.search.patchValue({
      firstname: customer.firstname,
      lastname: customer.lastname,
    });
  }

  //Ajoute le nouvel appointment dans la base de données
  public onAddAppointment(): void {
    // Récupérer la date sélectionnée dans le formulaire
    const selectedStartDate: Date = this.search.value.startDate ?? new Date();
    const selectedEndDate: Date = this.search.value.endDate ?? new Date();
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
    };
    this.appointmentService
      .addAppointment(appointmentObj)
      .subscribe((response: Appointments) => {});
    window.location.reload();
  }
}
