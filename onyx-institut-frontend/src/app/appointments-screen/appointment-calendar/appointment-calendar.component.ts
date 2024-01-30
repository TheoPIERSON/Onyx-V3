import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { Appointments } from 'src/app/Models/appointmentModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
})
export class AppointmentCalendarComponent {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  Appointments: Appointments[] = [];
  event: CalendarEvent[] = [];

  activeDayIsOpen = false;

  refresh = new Subject<void>();

  appointment$: Observable<Appointments[]> =
    this.appointmentService.getAppointments();

  constructor(private appointmentService: AppointmentService) {
    this.appointment$.subscribe((appointments) => {
      this.Appointments = appointments;
      this.mapAppointmentsToCalendarEvents();
    });
  }

  private mapAppointmentsToCalendarEvents(): void {
    this.event = this.Appointments.map((appointment) => {
      return {
        title:
          'Mme ' +
          appointment.customer.lastname +
          ' ' +
          appointment.customer.firstname, // Vous pouvez personnaliser le titre
        start: new Date(appointment.appointmentStartDate),
        end: new Date(appointment.appointmentEndDate),
        // Autres propriétés du CalendarEvent si nécessaire
      };
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  eventClicked(event: any) {
    console.log(event);
  }

  eventTimesChanged(event: any) {
    event.event.start = event.newStart;
    event.event.end = event.newEnd;
    this.refresh.next();
  }
}
