package com.skillbridge.skillbridge.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.entity.User;
import com.skillbridge.skillbridge.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public User registerUser(User user) {

        String otp = String.format("%06d", new Random().nextInt(1000000));

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);

        emailService.sendOtpEmail(user.getEmail(), otp);

        return savedUser;
    }

    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
  public User verifyOtp(String email, String otp) {

    System.out.println("VERIFY OTP API CALLED");
    System.out.println("Email received: " + email);
    System.out.println("OTP received: " + otp);

    User user = userRepository.findByEmail(email);

    if (user == null) {
        System.out.println("USER NOT FOUND");
        return null;
    }

    System.out.println("OTP in database: " + user.getOtp());
    System.out.println("OTP expiry: " + user.getOtpExpiry());

    if (user.getOtp() == null) {
        System.out.println("DATABASE OTP IS NULL");
        return null;
    }

    if (user.getOtpExpiry() == null) {
        System.out.println("OTP EXPIRY IS NULL");
        return null;
    }

    if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
        System.out.println("OTP EXPIRED");
        return null;
    }

   if (!user.getOtp().trim().equals(otp.trim())) {
    System.out.println("OTP DOES NOT MATCH");
    return null;
}

    user.setEmailVerified(true);
    user.setOtp(null);
    user.setOtpExpiry(null);

    System.out.println("OTP VERIFIED SUCCESSFULLY");

    return userRepository.save(user);
}
   public User sendPasswordResetOtp(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return null;
        }

        String otp = String.format("%06d", new Random().nextInt(1000000));

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        User savedUser = userRepository.save(user);

        emailService.sendPasswordResetOtpEmail(email, otp);

        return savedUser;
    }
public User findUserByEmail(String email) {
    return userRepository.findByEmail(email);
}
public User resetPassword(String email, String otp, String newPassword) {
    User user = userRepository.findByEmail(email);

    if (user == null) {
        return null;
    }

    if (user.getOtpExpiry() == null ||
        user.getOtpExpiry().isBefore(LocalDateTime.now())) {
        return null;
    }

    if (!user.getOtp().equals(otp)) {
        return null;
    }
System.out.println("Saved OTP: " + user.getOtp() + " | Entered OTP: " + otp);
    user.setPassword(newPassword);
    user.setOtp(null);
    user.setOtpExpiry(null);

    return userRepository.save(user);
}
public User updateProfile(String email, String newName) {
    User user = userRepository.findByEmail(email);

    if (user == null) {
        return null;
    }

    user.setName(newName);

    return userRepository.save(user);
}
}