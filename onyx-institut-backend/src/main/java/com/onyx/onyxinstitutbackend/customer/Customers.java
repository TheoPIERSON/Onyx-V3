package com.onyx.onyxinstitutbackend.customer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Customers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_customer",nullable = false, updatable = false)
    private Long id;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String email;
    private Date birthdate;

}
