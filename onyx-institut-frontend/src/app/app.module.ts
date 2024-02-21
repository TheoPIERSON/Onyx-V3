import { Inject, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer-screen/customer/customer.component';
import { CustomerService } from './core/services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerCardComponent } from './customer-screen/customer-card/customer-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerAddComponent } from './customer-screen/customer-add/customer-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgToastModule } from 'ng-angular-popup';

import { ModalComponent } from './modal/modal.component';
import { CustomerIdService } from './core/services/customer-id.service';
import { AppointmentComponent } from './appointments-screen/appointment/appointment.component';
import { AppointmentAddComponent } from './appointments-screen/appointment-add/appointment-add.component';
import { RouterLink, provideRouter } from '@angular/router';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointmentCalendarComponent } from './appointments-screen/appointment-calendar/appointment-calendar.component';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { PrestationsComponent } from './prestations-screen/prestations/prestations.component';
import { DashboardComponent } from './dashboard-screen/dashboard/dashboard.component';
import { PrestationsAddComponent } from './prestations-screen/prestations-add/prestations-add.component';
import { PrestationsCardComponent } from './prestations-screen/prestations-card/prestations-card.component';
import { PrestationEditModalComponent } from './prestations-screen/prestation-edit-modal/prestation-edit-modal.component';
import { PrestationDeleteModalComponent } from './prestations-screen/prestation-delete-modal/prestation-delete-modal.component';

registerLocaleData(localeFr, 'fr');

class CustomeDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerCardComponent,
    SidebarComponent,
    CustomerAddComponent,
    ModalComponent,
    AppointmentComponent,
    AppointmentAddComponent,
    AppointmentCalendarComponent,
    PrestationsComponent,
    DashboardComponent,
    PrestationsAddComponent,
    PrestationsCardComponent,
    PrestationEditModalComponent,
    PrestationDeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,

    RouterLink,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule,
    NgSelectModule,
    NgToastModule,
  ],

  providers: [
    CustomerService,
    CustomerIdService,
    provideRouter(routes),
    [{ provide: CalendarDateFormatter, useClass: CustomeDateFormatter }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
