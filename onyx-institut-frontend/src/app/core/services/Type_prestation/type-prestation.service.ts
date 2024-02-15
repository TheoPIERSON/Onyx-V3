import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypePrestationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchTypePrestation(): Observable<TypePrestation[]> {
    return this.http.get<TypePrestation[]>(
      `${this.apiServerUrl}/type_prestation/all`
    );
  }
  public addPrestation(service: TypePrestation): Observable<TypePrestation> {
    return this.http.post<TypePrestation>(
      `${this.apiServerUrl}/type_prestation/add`,
      service
    );
  }
}
