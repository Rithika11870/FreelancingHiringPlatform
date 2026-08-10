package com.skillbridge.skillbridge.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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
    return 
    userService.loginUser(user.getEmail(), user.getPassword());
}
}