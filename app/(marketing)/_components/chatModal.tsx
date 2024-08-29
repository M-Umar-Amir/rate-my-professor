"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { ChatBubble } from "./chatBubble";

export const ChatModal = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, how can I help you?", isUser: false },
    { id: 2, text: "I have a question about your service.", isUser: true },
    { id: 3, text: "Sure, what would you like to know?", isUser: false },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, isUser: true },
      ]);
      setNewMessage("");
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
        Chat with our Ai
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find the Prof by chatting with the Ai</DialogTitle>
          <DialogDescription>
            <div className="p-4 bg-gray-100 rounded-lg max-w-lg mx-auto flex flex-col h-[80vh]">
              <div className="flex-grow overflow-y-auto mb-4">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-black text-white rounded-r-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
