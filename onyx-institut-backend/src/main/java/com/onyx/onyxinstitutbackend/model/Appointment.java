package com.onyx.onyxinstitutbackend.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_appointment",nullable = false, updatable = false)
    private Long id_appointment;
    private Date appointment_date;
    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customers customer;

    public Appointment() {
    }

    public Appointment(Long id_appointment, Date appointment_date, Customers customer) {
        this.id_appointment = id_appointment;
        this.appointment_date = appointment_date;
        this.customer = customer;
    }

    public Long getId_appointment() {
        return id_appointment;
    }

    public void setId_appointment(Long id_appointment) {
        this.id_appointment = id_appointment;
    }

    public Date getAppointment_date() {
        return appointment_date;
    }

    public void setAppointment_date(Date appointment_date) {
        this.appointment_date = appointment_date;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }
}