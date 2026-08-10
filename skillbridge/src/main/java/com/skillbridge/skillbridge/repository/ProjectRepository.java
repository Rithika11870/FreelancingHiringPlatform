package com.skillbridge.skillbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skillbridge.skillbridge.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}