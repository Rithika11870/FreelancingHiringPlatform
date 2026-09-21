package com.skillbridge.skillbridge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillbridge.skillbridge.entity.User;
import com.skillbridge.skillbridge.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.loginUser(user.getEmail(), user.getPassword());
    }

    @PostMapping("/verify-otp")
    public User verifyOtp(@RequestBody User user) {
        return userService.verifyOtp(user.getEmail(), user.getOtp());
    }
    @PostMapping("/forgot-password")
public User forgotPassword(@RequestBody User user) {
   return userService.sendPasswordResetOtp(user.getEmail());
}
@PostMapping("/reset-password")
public User resetPassword(@RequestBody User user) {
    return userService.resetPassword(
        user.getEmail(),
        user.getOtp(),
        user.getPassword()
    );
}
@PutMapping("/update-profile")
public User updateProfile(@RequestBody User user) {
    return userService.updateProfile(user.getEmail(), user.getName());
}
}