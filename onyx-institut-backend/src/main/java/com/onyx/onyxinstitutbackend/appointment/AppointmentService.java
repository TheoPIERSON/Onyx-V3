package com.onyx.onyxinstitutbackend.appointment;

import com.onyx.onyxinstitutbackend.appointment.Appointment;
import com.onyx.onyxinstitutbackend.appointment.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Iterable<Appointment> getAllAppointments() {return appointmentRepository.findAll();
    }

    public Appointment addAppointment(Appointment appointment) {return appointmentRepository.save(appointment);
    }
}
