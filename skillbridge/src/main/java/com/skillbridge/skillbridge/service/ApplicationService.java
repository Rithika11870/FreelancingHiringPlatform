package com.skillbridge.skillbridge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.entity.Application;
import com.skillbridge.skillbridge.repository.ApplicationRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
private EmailService emailService;
    public Application applyForProject(Application application) {
        application.setStatus("PENDING");
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByProject(Long projectId) {
        return applicationRepository.findByProjectId(projectId);
    }
    public List<Application> getApplicationsByFreelancerEmail(String freelancerEmail) {
    return applicationRepository.findByFreelancerEmail(freelancerEmail);
}

   public Application updateApplicationStatus(Long applicationId, String status) {
   
    Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

    application.setStatus(status);
    if ("ACCEPTED".equalsIgnoreCase(status)) {
    application.setNotification("Your application has been accepted!");
} else if ("REJECTED".equalsIgnoreCase(status)) {
    application.setNotification("Your application has been rejected.");
}
if ("ACCEPTED".equalsIgnoreCase(status)) {
    application.setNotification("Your application has been accepted!");
} else if ("REJECTED".equalsIgnoreCase(status)) {
    application.setNotification("Your application has been rejected.");
}
    Application updatedApplication = applicationRepository.save(application);

    if ("ACCEPTED".equalsIgnoreCase(status)) {
        System.out.println("Acceptance email sending to: " + application.getFreelancerEmail());
        emailService.sendAcceptanceEmail(
             application.getFreelancerEmail(),
                application.getProjectId()
        );
    }

    return updatedApplication;
}
public Application addReview(Long applicationId, Integer rating, String review) {
    Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

    application.setRating(rating);
    application.setReview(review);

    return applicationRepository.save(application);
}
public Application submitWork(Long applicationId, String workLink) {
    Application application = applicationRepository.findById(applicationId)
        .orElseThrow(() -> new RuntimeException("Application not found"));

    application.setWorkLink(workLink);

    return applicationRepository.save(application);
}
}