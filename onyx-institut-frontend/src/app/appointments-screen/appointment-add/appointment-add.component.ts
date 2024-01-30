import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/app/Models/appointmentClass';
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
export class AppointmentAddComponent implements OnInit {
  customers$: Observable<Customers[]> = this.customerService.fetchCustomers();

  constructor(
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    private builder: FormBuilder
  ) {}

  appointmentForm = this.builder.group({
    appointmentStartDate: this.builder.control(new Date()),
    customer: this.builder.control(0),
  });

  startDate: Date =
    this.appointmentForm.value.appointmentStartDate ?? new Date();
  customerId: number = this.appointmentForm.value.customer ?? 0;

  selectedCustomerId = 0;

  ngOnInit(): void {}

  public onAddAppointment(addForm: NgForm): void {
    console.log('La valeur sélectionnée est :', this.selectedCustomerId);
    let appointmentData = addForm.value;
    let appointment = new Appointment(appointmentData);

    // Utiliser un opérateur de combinaison pour obtenir le client correspondant au selectedCustomerId
    this.customers$.subscribe((customers) => {
      const selectedCustomer = customers.find(
        (customer) => customer.id === this.selectedCustomerId
      );
      if (selectedCustomer) {
        appointment.customer = selectedCustomer;

        this.appointmentService
          .addAppointment(appointment)
          .subscribe((response: Appointments) => {
            console.log(response);
            addForm.reset();
          });
      }
    });
  }
}
