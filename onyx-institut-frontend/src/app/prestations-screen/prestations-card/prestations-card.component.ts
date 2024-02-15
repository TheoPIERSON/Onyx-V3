import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { Customers } from 'src/app/Models/customerModel';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { RefreshService } from 'src/app/core/services/Refresh/refresh.service';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { CustomerIdService } from 'src/app/core/services/customer-id.service';
import { ModalDeleteComponent } from 'src/app/modal-delete/modal-delete.component';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-prestations-card',
  templateUrl: './prestations-card.component.html',
  styleUrls: ['./prestations-card.component.css'],
})
export class PrestationsCardComponent {
  typePrestation$: Observable<TypePrestation[]> =
    this.typePrestationService.fetchTypePrestation();

  search = this.fb.nonNullable.group({
    title: [''],
  });

  constructor(
    private typePrestationService: TypePrestationService,
    public matDialog: MatDialog,
    private fb: FormBuilder,
    private refreshService: RefreshService
  ) {}

  public customers: TypePrestation[] = [];

  refreshSubscription: any;

  ngOnInit(): void {
    // Abonnez-vous aux événements de rafraîchissement
    this.refreshSubscription = this.refreshService
      .getRefreshObservable()
      .subscribe(() => {
        // Mettez ici le code que vous souhaitez exécuter lors du rafraîchissement du composant
        this.typePrestation$ = this.getTypePrestation(); // Réinitialisez les données du composant
      });
  }

  ngOnDestroy(): void {
    // N'oubliez pas de vous désabonner pour éviter les fuites de mémoire
    this.refreshSubscription.unsubscribe();
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  openModalDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-delete-component';
    const modalDialog = this.matDialog.open(ModalDeleteComponent, dialogConfig);
  }

  onCardClick(id: number): void {
    // this.customerService.findCustomerById(id).subscribe(
    //   (res: Customers) => {
    //     this.selectedCustomer = res;
    //     this.customerIdService.setSelectedCustomerId(id);
    //     this.openModal(); // Ouvrez la modale avec les informations du client
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error(error);
    //   }
    // );
  }
  onDeleteCardClick(id: number): void {
    // this.customerService.findCustomerById(id).subscribe(
    //   (res: Customers) => {
    //     this.selectedCustomer = res;
    //     this.customerIdService.setSelectedCustomerId(id);
    //     this.openModalDelete(); // Ouvrez la modale avec les informations du client
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error(error);
    //   }
    // );
  }

  private getTypePrestation(): Observable<TypePrestation[]> {
    const customers$ = this.typePrestationService.fetchTypePrestation();

    const search$ = combineLatest([this.search.controls.title.valueChanges]);
    return combineLatest([customers$, search$]).pipe(
      map(([customers, [title]]) =>
        customers.filter((customer) => {
          const isFirstnameMatching = customer.title
            .toLowerCase()
            .includes(title.toLowerCase());
          return isFirstnameMatching;
        })
      )
    );
  }
}
