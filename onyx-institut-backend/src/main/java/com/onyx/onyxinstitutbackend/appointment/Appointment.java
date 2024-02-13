package com.onyx.onyxinstitutbackend.appointment;

import com.onyx.onyxinstitutbackend.customer.Customers;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_appointment", nullable = false, updatable = false)
    private Long id;
    private Timestamp appointmentStartDate;
    private Timestamp appointmentEndDate; // Nouvel attribut pour la date de fin

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customers customer;

}


