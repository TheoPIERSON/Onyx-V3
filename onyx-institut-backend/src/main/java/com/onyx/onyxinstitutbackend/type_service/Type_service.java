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

    public Type_service(){}
    public Type_service(Long id_type_service, String title, String description, int price, int duration) {
        this.id_type_service = id_type_service;
        this.title = title;
        this.description = description;
        this.price = price;
        this.duration = duration;
    }

    public Long getId_type_service() {
        return id_type_service;
    }

    public void setId_type_service(Long id_type_service) {
        this.id_type_service = id_type_service;
    }

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
