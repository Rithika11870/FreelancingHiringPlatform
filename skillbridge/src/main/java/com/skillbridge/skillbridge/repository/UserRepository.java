package com.skillbridge.skillbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skillbridge.skillbridge.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
User findByEmailAndPassword(String email, String password);
}
