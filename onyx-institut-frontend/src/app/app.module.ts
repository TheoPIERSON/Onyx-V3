import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './core/services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerSearchListComponent } from './customer-search-list/customer-search-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { CustomerIdService } from './core/services/customer-id.service';
import { AppointmentComponent } from './appointments-screen/appointment/appointment.component';
import { AppointmentAddComponent } from './appointments-screen/appointment-add/appointment-add.component';
import { RouterLink, provideRouter } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointmentCalendarComponent } from './appointments-screen/appointment-calendar/appointment-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerCardComponent,
    CustomerSearchComponent,
    SidebarComponent,
    CustomerAddComponent,
    CustomerSearchListComponent,
    ModalComponent,
    AppointmentComponent,
    AppointmentAddComponent,
    AppointmentCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [CustomerService, CustomerIdService, provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
