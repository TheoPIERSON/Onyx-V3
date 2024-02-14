import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';

@Component({
  selector: 'app-prestations-add',
  templateUrl: './prestations-add.component.html',
  styleUrls: ['./prestations-add.component.css'],
})
export class PrestationsAddComponent {
  public prestation: TypePrestation[] = [];

  constructor(private typePrestationService: TypePrestationService) {}

  public onAddPrestation(addPrestationForm: NgForm): void {
    document.getElementById('add-prestation-btn');
    this.typePrestationService.addPrestation(addPrestationForm.value).subscribe(
      (response: TypePrestation) => {
        console.log(response);
        addPrestationForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addPrestationForm.reset();
      }
    );
    window.location.reload();
  }
}
