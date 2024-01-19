package com.onyx.onyxinstitutbackend.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_appointment", nullable = false, updatable = false)
    private Long id_appointment;
    private Timestamp appointmentStartDate;
    private Timestamp appointmentEndDate; // Nouvel attribut pour la date de fin

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customers customer;

    public Appointment() {
    }

    public Appointment(Long id_appointment, Timestamp appointmentStartDate, Timestamp appointmentEndDate, Customers customer) {
        this.id_appointment = id_appointment;
        this.appointmentStartDate = appointmentStartDate;
        this.appointmentEndDate = appointmentEndDate;
        this.customer = customer;
    }

    public Long getId_appointment() {
        return id_appointment;
    }

    public void setId_appointment(Long id_appointment) {
        this.id_appointment = id_appointment;
    }

    public Timestamp getAppointmentStartDate() {
        return appointmentStartDate;
    }

    public void setAppointmentStartDate(Timestamp appointmentStartDate) {
        this.appointmentStartDate = appointmentStartDate;
    }

    public Timestamp getAppointmentEndDate() {
        return appointmentEndDate;
    }

    public void setAppointmentEndDate(Timestamp appointmentEndDate) {
        this.appointmentEndDate = appointmentEndDate;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }
}


