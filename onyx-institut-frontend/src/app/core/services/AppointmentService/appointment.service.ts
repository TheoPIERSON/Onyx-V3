import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Appointments } from 'src/app/Models/appointmentModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAppointments(): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(
      `${this.apiServerUrl}/appointment/all`
    );
  }
  public addAppointment(appointment: Appointments): Observable<Appointments> {
    return this.http.post<Appointments>(
      `${this.apiServerUrl}/appointment/add`,
      appointment
    );
  }
  public findById(id: number): Observable<Appointments> {
    return this.http.get<Appointments>(
      `${this.apiServerUrl}/appointment/${id}`
    );
  }
  public getLatestAppointment(): Observable<Appointments> {
    return this.http.get<Appointments>(
      `${this.apiServerUrl}/appointment/latest`
    );
  }

  assignPrestationToAppointment(
    idAppointment: number,
    idTypePrestation: number
  ): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiServerUrl}/appointment/${idAppointment}/type-prestation/${idTypePrestation}`,
        null
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError('Something went wrong; please try again later.');
  }
}
