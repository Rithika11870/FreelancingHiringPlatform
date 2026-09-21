package com.skillbridge.skillbridge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillbridge.skillbridge.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderEmailAndReceiverEmailOrReceiverEmailAndSenderEmail(
            String senderEmail,
            String receiverEmail,
            String receiverEmail2,
            String senderEmail2
    );
}
