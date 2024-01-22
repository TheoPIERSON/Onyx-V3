import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { add } from 'date-fns';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Appointment } from 'src/app/Models/appointmentModel';
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
  // search = new FormControl('');

  // customers$: Observable<Customer[]> = combineLatest([
  //   this.customerService.fetchCustomers(),
  //   this.search.valueChanges.pipe(startWith('')),
  // ]).pipe(
  //   map(([customers, searchValue]) =>
  //     customers.filter((customer) =>
  //       this.customerMatchesSearch(customer, searchValue)
  //     )
  //   )
  // );

  // constructor(private customerService: CustomerService) {}

  // private customerMatchesSearch(
  //   customer: Customer,
  //   searchValue: string | null
  // ): boolean {
  //   const lowerCaseSearch = (searchValue || '').toLowerCase(); // Utilisez une chaîne vide si searchValue est null
  //   return (
  //     customer.firstname.toLowerCase().includes(lowerCaseSearch) ||
  //     customer.lastname.toLowerCase().includes(lowerCaseSearch)
  //   );
  // }

  customers$: Observable<Customer[]> = this.customerService.fetchCustomers();
  isSubmitted = false;

  onPost = () => (this.isSubmitted = true);

  frm!: FormGroup;

  ngOnInit(): void {
    this.frm = this.fb.group({
      selectedCustomer: [],
    });
  }

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private appointmentService: AppointmentService
  ) {}

  public onAddAppointment(addForm: NgForm): void {
    document.getElementById('add-appointment-btn');
    this.appointmentService.addAppointment(addForm.value).subscribe(
      (response: Appointment) => {
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
