package com.skillbridge.skillbridge.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String projectTitle;
    private String clientEmail;
    private String freelancerName;
    private String freelancerEmail;
    private String proposal;
    private String status;
    private String notification;
private Integer rating;
private String review;
private String workLink;
    public Application() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProjectId() {
        return projectId;
    }
    

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getFreelancerName() {
        return freelancerName;
    }

    public void setFreelancerName(String freelancerName) {
        this.freelancerName = freelancerName;
    }

    public String getFreelancerEmail() {
        return freelancerEmail;
    }

    public void setFreelancerEmail(String freelancerEmail) {
        this.freelancerEmail = freelancerEmail;
    }

    public String getProposal() {
        return proposal;
    }

    public void setProposal(String proposal) {
        this.proposal = proposal;
    }

    public String getStatus() {
        return status;
    }
    public String getNotification() {
    return notification;
}

public void setNotification(String notification) {
    this.notification = notification;
}
public Integer getRating() {
    return rating;
}

public void setRating(Integer rating) {
    this.rating = rating;
}

public String getReview() {
    return review;
}

public void setReview(String review) {
    this.review = review;
}
public String getWorkLink() {
    return workLink;
}

public void setWorkLink(String workLink) {
    this.workLink = workLink;
}

public String getProjectTitle() {
    return projectTitle;
}

public void setProjectTitle(String projectTitle) {
    this.projectTitle = projectTitle;
}
    public void setStatus(String status) {
        this.status = status;
    }
    
}
