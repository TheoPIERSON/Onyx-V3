package com.onyx.onyxinstitutbackend.type_prestation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
