import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TypeService } from 'src/app/Models/type_service';
import { TypeServiceService } from 'src/app/core/services/Type_serviceService/type-service.service';

@Component({
  selector: 'app-prestations-add',
  templateUrl: './prestations-add.component.html',
  styleUrls: ['./prestations-add.component.css'],
})
export class PrestationsAddComponent {
  public typeservice: TypeService[] = [];

  constructor(private typeService: TypeServiceService) {}

  public onAddCustomer(addForm: NgForm): void {
    document.getElementById('add-customer-btn');
    this.typeService.addPrestation(addForm.value).subscribe(
      (response: TypeService) => {
        console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    window.location.reload();
  }
}
