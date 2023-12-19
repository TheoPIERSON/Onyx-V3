// customer-id.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerIdService {
  private selectedCustomerId: number = 0;

  setSelectedCustomerId(id: number): void {
    this.selectedCustomerId = id;
  }

  getSelectedCustomerId(): number {
    return this.selectedCustomerId;
  }
}
