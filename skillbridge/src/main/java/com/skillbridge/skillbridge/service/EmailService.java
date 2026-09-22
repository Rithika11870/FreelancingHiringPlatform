package com.skillbridge.skillbridge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setFrom("rithuajay11@gmail.com");
        message.setSubject("SkillBridge - Email Verification OTP");

        message.setText(
            "Your SkillBridge verification OTP is: " + otp
            + "\n\nThis OTP is valid for 5 minutes."
        );

        mailSender.send(message);
    }

    public void sendPasswordResetOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setFrom("rithuajay11@gmail.com");
        message.setSubject("SkillBridge - Password Reset OTP");

        message.setText(
            "Your SkillBridge password reset OTP is: " + otp
            + "\n\nThis OTP is valid for 5 minutes."
        );

        mailSender.send(message);
    }

    public void sendAcceptanceEmail(String toEmail, Long projectId) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setFrom("rithuajay11@gmail.com");
        message.setSubject("SkillBridge - Application Accepted");

        message.setText(
            "Congratulations!\n\n"
            + "Your application for Project ID " + projectId
            + " has been accepted by the client.\n\n"
            + "Please login to SkillBridge for more details."
        );

        mailSender.send(message);
    }
    public void sendDeadlineReminderEmail(
        String toEmail,
        String projectTitle,
        String deadline,
        long daysRemaining) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(toEmail);
    message.setFrom("rithuajay11@gmail.com");
    message.setSubject("⚠️ Deadline Alert – " + projectTitle);

    message.setText(
        "Hello,\n\n"
        + "This is a reminder for your project:\n\n"
        + "Project: " + projectTitle + "\n"
        + "Deadline: " + deadline + "\n"
        + "Days Remaining: " + daysRemaining + "\n\n"
        + "Please complete and submit your work before the deadline.\n\n"
        + "Thank you,\n"
        + "SkillBridge Team"
    );

    mailSender.send(message);
}
}
