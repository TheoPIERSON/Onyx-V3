import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { CustomerComponent } from './customer-screen/customer/customer.component';
import { AppointmentComponent } from './appointments-screen/appointment/appointment.component';
import { PrestationsComponent } from './prestations-screen/prestations/prestations.component';
import { DashboardComponent } from './dashboard-screen/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'prestations', component: PrestationsComponent },
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
