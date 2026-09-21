package com.skillbridge.skillbridge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skillbridge.skillbridge.entity.Message;
import com.skillbridge.skillbridge.service.MessageService;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message message) {
        return messageService.sendMessage(message);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(
            @RequestParam String senderEmail,
            @RequestParam String receiverEmail) {

        return messageService.getConversation(senderEmail, receiverEmail);
    }
}