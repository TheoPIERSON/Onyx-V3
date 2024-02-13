import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeService } from 'src/app/Models/type_service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeServiceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchTypeServices(): Observable<TypeService[]> {
    return this.http.get<TypeService[]>(
      `${this.apiServerUrl}/type-service/all`
    );
  }
  public addPrestation(service: TypeService): Observable<TypeService> {
    return this.http.post<TypeService>(
      `${this.apiServerUrl}/customer/add`,
      service
    );
  }
}
