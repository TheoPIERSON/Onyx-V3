import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationsCardComponent } from './prestations-card.component';

describe('PrestationsCardComponent', () => {
  let component: PrestationsCardComponent;
  let fixture: ComponentFixture<PrestationsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationsCardComponent]
    });
    fixture = TestBed.createComponent(PrestationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
