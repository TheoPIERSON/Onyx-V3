package com.onyx.onyxinstitutbackend.controller;

import com.onyx.onyxinstitutbackend.model.Appointments;
import com.onyx.onyxinstitutbackend.model.Customers;
import com.onyx.onyxinstitutbackend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/all")
    public ResponseEntity<List<Appointments>> getAllCustomers (){
        List<Appointments> appointment = (List<Appointments>) appointmentService.getAllAppointments();
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }
}
