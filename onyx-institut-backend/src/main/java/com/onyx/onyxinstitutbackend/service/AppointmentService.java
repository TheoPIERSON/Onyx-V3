package com.onyx.onyxinstitutbackend.service;

import com.onyx.onyxinstitutbackend.model.Appointment;
import com.onyx.onyxinstitutbackend.model.Customers;
import com.onyx.onyxinstitutbackend.repository.AppointmentRepository;
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
