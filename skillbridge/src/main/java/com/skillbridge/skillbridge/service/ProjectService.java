package com.skillbridge.skillbridge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.entity.Project;
import com.skillbridge.skillbridge.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

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
    }
