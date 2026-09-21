package com.skillbridge.skillbridge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skillbridge.skillbridge.entity.Application;
import com.skillbridge.skillbridge.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public Application applyForProject(@RequestBody Application application) {
        return applicationService.applyForProject(application);
    }

    @GetMapping("/project/{projectId}")
    public List<Application> getApplicationsByProject(
            @PathVariable Long projectId) {
        return applicationService.getApplicationsByProject(projectId);
    }
    @GetMapping("/freelancer/{freelancerEmail}")
public List<Application> getApplicationsByFreelancerEmail(
        @PathVariable String freelancerEmail) {
    return applicationService.getApplicationsByFreelancerEmail(freelancerEmail);
}
    @PutMapping("/{applicationId}/status")
public Application updateApplicationStatus(
        @PathVariable Long applicationId,
        @RequestParam String status) {

    return applicationService.updateApplicationStatus(
            applicationId, status);
}
@PostMapping("/{applicationId}/review")
public Application addReview(
        @PathVariable("applicationId") Long applicationId,
        @RequestParam("rating") Integer rating,
        @RequestParam("review") String review) {

    return applicationService.addReview(
            applicationId, rating, review);
}
@PutMapping("/{applicationId}/submit-work")
public Application submitWork(
        @PathVariable("applicationId") Long applicationId,
        @RequestParam("workLink") String workLink) {
    return applicationService.submitWork(applicationId, workLink);
}
}
