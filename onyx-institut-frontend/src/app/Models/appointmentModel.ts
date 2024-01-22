import { Customers } from './customerModel';

export interface Appointment {
  id: number;
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  customer: Customers;
}
