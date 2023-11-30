import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customers } from '../customer';
import { CustomerService } from '../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent {
  public customers: Customers[] = [];

  myObservable = new Observable((observer) => {
    observer.next('Salut !'); // Il raconte une partie de l'histoire
    observer.next('Comment ça va ?'); // Il continue
    observer.complete(); // Il signale qu'il a fini
  });

  constructor(private customerService: CustomerService) {}

  public onAddCustomer(addForm: NgForm): void {
    document.getElementById('add-customer-btn');
    this.customerService.addCustomer(addForm.value).subscribe(
      (response: Customers) => {
        console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
