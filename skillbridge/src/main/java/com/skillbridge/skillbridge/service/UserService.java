package com.skillbridge.skillbridge.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.entity.User;
import com.skillbridge.skillbridge.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }
    public User loginUser(String email, String password) {
    return 
    userRepository.findByEmailAndPassword(email, password);
}
}