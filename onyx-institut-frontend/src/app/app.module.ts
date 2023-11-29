import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerSearchListComponent } from './customer-search-list/customer-search-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerCardComponent,
    CustomerSearchComponent,
    SidebarComponent,
    CustomerAddComponent,
    CustomerSearchListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
