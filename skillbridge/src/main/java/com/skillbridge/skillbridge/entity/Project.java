    package com.skillbridge.skillbridge.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "budget")
private Double budget;
   @Column(name = "client_name")
private String clientName;

@Column(name = "client_email")
private String clientEmail;
    private String category;
private String deadline;
    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getClientName() {
        return clientName;
    }
    public String getClientEmail() {
    return clientEmail;
}

public void setClientEmail(String clientEmail) {
    this.clientEmail = clientEmail;
}

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getCategory() {
    return category;
    }

    public void setCategory(String category) {
    this.category = category;
}
}
