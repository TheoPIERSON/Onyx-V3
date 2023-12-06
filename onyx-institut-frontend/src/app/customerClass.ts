import { Customers } from './customerModel';

export class Customer implements Customers {
  id_customer: number;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  mail: string;
  birthdate: string;

  // Ajoutez un constructeur si nécessaire
  constructor(customerData: Customers) {
    this.id_customer = customerData.id_customer;
    this.firstname = customerData.firstname;
    this.lastname = customerData.lastname;
    this.phoneNumber = customerData.phoneNumber;
    this.mail = customerData.mail;
    this.birthdate = customerData.birthdate;
  }
}
