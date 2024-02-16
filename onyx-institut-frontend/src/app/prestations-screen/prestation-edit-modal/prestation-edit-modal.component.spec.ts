import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationEditModalComponent } from './prestation-edit-modal.component';

describe('PrestationEditModalComponent', () => {
  let component: PrestationEditModalComponent;
  let fixture: ComponentFixture<PrestationEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationEditModalComponent]
    });
    fixture = TestBed.createComponent(PrestationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
