package com.onyx.onyxinstitutbackend.service;

import com.onyx.onyxinstitutbackend.model.Appointments;
import com.onyx.onyxinstitutbackend.model.Customers;
import com.onyx.onyxinstitutbackend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Iterable<Appointments> getAllAppointments() {return appointmentRepository.findAll();
    }
}
