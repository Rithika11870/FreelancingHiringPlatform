package com.skillbridge.skillbridge.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.entity.Application;
import com.skillbridge.skillbridge.entity.Project;
import com.skillbridge.skillbridge.repository.ApplicationRepository;
import com.skillbridge.skillbridge.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ApplicationRepository applicationRepository;

    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public List<Project> getProjectsByClientEmail(String email) {
        return projectRepository.findByClientEmail(email);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void sendDeadlineReminders() {

        List<Project> projects = projectRepository.findAll();

        LocalDate today = LocalDate.now();

        for (Project project : projects) {

            if (project.getDeadline() == null ||
                project.getDeadline().isEmpty()) {
                continue;
            }

            LocalDate deadline = LocalDate.parse(project.getDeadline());

            long daysRemaining =
                    ChronoUnit.DAYS.between(today, deadline);

            if (daysRemaining >= 0 && daysRemaining <= 3) {

                List<Application> applications =
                        applicationRepository.findByProjectId(project.getId());

                for (Application application : applications) {

                    if ("ACCEPTED".equalsIgnoreCase(application.getStatus())) {

                        emailService.sendDeadlineReminderEmail(
                                application.getFreelancerEmail(),
                                project.getTitle(),
                                project.getDeadline(),
                                daysRemaining
                        );
                    }
                }
            }
        }
    }
}
