import { Customers } from './customerModel';

export class Appointment {
  appointment: any;
  [x: string]: any;
  id: number;
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  customer: Customers;

  constructor(data: any) {
    this.id = data.id;
    this.appointmentStartDate = data.appointmentStartDate;
    this.appointmentEndDate = data.appointmentEndDate;
    this.customer = data.customer;
  }
}
