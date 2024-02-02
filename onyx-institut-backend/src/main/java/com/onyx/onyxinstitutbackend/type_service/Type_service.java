package com.onyx.onyxinstitutbackend.type_service;

import com.onyx.onyxinstitutbackend.model.Customers;
import jakarta.persistence.*;

import java.sql.Timestamp;
@Entity
@Table(name = "type_service")
public class Type_service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_service", nullable = false, updatable = false)
    private Long id_type_service;
    private String title;
    private String description;
    private int price;
    private int duration;

    public Long getId() {return id_type_service;}

    public void setId(Long id) {
        this.id_type_service = id;}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
