package com.skillbridge.skillbridge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillbridge.skillbridge.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByClientEmail(String email);

}