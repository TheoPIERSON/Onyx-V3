import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
