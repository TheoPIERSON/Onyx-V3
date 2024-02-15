import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private refreshSubject = new Subject<void>();

  // Méthode pour émettre un événement de rafraîchissement
  refreshComponent() {
    this.refreshSubject.next();
  }

  // Méthode pour écouter les événements de rafraîchissement
  getRefreshObservable() {
    return this.refreshSubject.asObservable();
  }
}
