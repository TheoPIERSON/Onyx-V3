package com.onyx.onyxinstitutbackend.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Customers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_customer",nullable = false, updatable = false)
    private Long id_customer;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String mail;
    private Date birthdate;


    public Long getId() {
        return id_customer;
    }

    public void setId(Long id) {
        this.id_customer = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }
}
