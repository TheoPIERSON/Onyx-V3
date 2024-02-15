import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TypePrestation } from 'src/app/Models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';

@Component({
  selector: 'app-prestations-add',
  templateUrl: './prestations-add.component.html',
  styleUrls: ['./prestations-add.component.css'],
})
export class PrestationsAddComponent {
  public prestation: TypePrestation[] = [];

  constructor(
    private typePrestationService: TypePrestationService,
    public matDialog: MatDialog,
    private fb: FormBuilder
  ) {}

  search = this.fb.nonNullable.group({
    title: '',
    description: '',
    price: 0,
    duration: 0,
  });

  //Ajoute le nouvel appointment dans la base de données
  public onAddAppointment(): void {
    const actualTitle: string = this.search.value.title ?? 'titre ';
    const actualDescription: string =
      this.search.value.description ?? 'description';
    const actualPrice: number = this.search.value.price ?? 0;
    const actualDuration: number = this.search.value.duration ?? 0;
    // Reste du code...
    const prestationObj: TypePrestation = {
      id: 0,
      title: actualTitle,
      description: actualDescription,
      duration: actualDuration,
      price: actualPrice,
    };
    this.typePrestationService
      .addPrestation(prestationObj)
      .subscribe((response: TypePrestation) => {});
    window.location.reload();
  }
}
