import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchListComponent } from './customer-search-list.component';

describe('CustomerSearchListComponent', () => {
  let component: CustomerSearchListComponent;
  let fixture: ComponentFixture<CustomerSearchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSearchListComponent]
    });
    fixture = TestBed.createComponent(CustomerSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
