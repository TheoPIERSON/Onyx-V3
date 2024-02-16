import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationDeleteModalComponent } from './prestation-delete-modal.component';

describe('PrestationDeleteModalComponent', () => {
  let component: PrestationDeleteModalComponent;
  let fixture: ComponentFixture<PrestationDeleteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationDeleteModalComponent]
    });
    fixture = TestBed.createComponent(PrestationDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
