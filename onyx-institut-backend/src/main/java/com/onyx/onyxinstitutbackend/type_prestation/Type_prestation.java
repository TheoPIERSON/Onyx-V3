package com.onyx.onyxinstitutbackend.type_prestation;

import com.onyx.onyxinstitutbackend.appointment.Appointment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type_prestation")
public class Type_prestation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_prestation", nullable = false, updatable = false)
    private Long id;
    private String title;
    private String description;
    private int price;
    private int duration;
}
