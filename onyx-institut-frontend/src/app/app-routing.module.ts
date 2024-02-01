import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { AppointmentComponent } from './appointments-screen/appointment/appointment.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: '', component: AutocompleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
