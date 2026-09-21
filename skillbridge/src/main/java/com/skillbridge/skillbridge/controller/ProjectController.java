package com.skillbridge.skillbridge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skillbridge.skillbridge.entity.Project;
import com.skillbridge.skillbridge.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/add")
    public Project addProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }
    @GetMapping
    public java.util.List<Project> getAllProjects() {
    return projectService.getAllProjects();
}
@GetMapping("/{id}")
public Project getProjectById(@PathVariable Long id) {
    return projectService.getProjectById(id);
}
@GetMapping("/client/{email}")
public java.util.List<Project> getProjectsByClientEmail(
        @PathVariable String email) {
    return projectService.getProjectsByClientEmail(email);
}
@DeleteMapping("/{id}")
public String deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
    return "Project deleted successfully!";
}
}
