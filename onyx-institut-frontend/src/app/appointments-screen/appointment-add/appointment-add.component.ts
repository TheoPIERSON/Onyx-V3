import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Appointments } from 'src/app/Models/appointmentModel';

import { Customers } from 'src/app/Models/customerModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css'],
})
export class AppointmentAddComponent {
  customers$: Observable<Customers[]> = this.customerService.fetchCustomers();

  selectedCustomerId = 0;
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();

  constructor(
    private customerService: CustomerService,
    private appointmentService: AppointmentService
  ) {}

  public onAddAppointment(addForm: NgForm): void {
    console.log('La date sélectionnée est :', this.selectedStartDate);

    const appointmentObj: Appointments = {
      id: 0,
      appointmentStartDate: this.selectedStartDate,
      appointmentEndDate: this.selectedEndDate,
      customer: {
        id: this.selectedCustomerId, //this.customerId,
        firstname: '',
        lastname: '',
        phoneNumber: '',
        mail: '',
        birthdate: '',
      },
    };
    this.appointmentService
      .addAppointment(appointmentObj)
      .subscribe((response: Appointments) => {
        console.log(response);
        addForm.reset();
      });
  }
}
