package com.skillbridge.skillbridge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.entity.Message;
import com.skillbridge.skillbridge.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getConversation(
            String senderEmail,
            String receiverEmail) {

        return messageRepository
                .findBySenderEmailAndReceiverEmailOrReceiverEmailAndSenderEmail(
                        senderEmail,
                        receiverEmail,
                        senderEmail,
                        receiverEmail
                );
    }
}