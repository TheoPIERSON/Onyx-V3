package com.onyx.onyxinstitutbackend.appointment;

import com.onyx.onyxinstitutbackend.customer.Customers;
import com.onyx.onyxinstitutbackend.type_prestation.Type_prestation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany
    @JoinTable(name = "prestation",
                joinColumns = @JoinColumn(name = "appointment_id"),
                inverseJoinColumns = @JoinColumn(name = "type_prestation_id"))
    private Set<Type_prestation> typePrestations = new HashSet<>();
}


