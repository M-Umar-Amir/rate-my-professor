/* "use client";
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
 */

'use client';
/* "use client";
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
 */

'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { ChatBubble } from './chatBubble';

export const ChatModal = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, how can I help you?', isUser: false },
    { id: 2, text: 'I have a question about your service.', isUser: true },
    { id: 3, text: 'Sure, what would you like to know?', isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending a message and getting a response
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: newMessage, isUser: true },
      ]);

      try {
        // Generate embeddings for the user's message using Hugging Face API
        const openaiResponse = await axios.post(
          'https://expert-space-funicular-qrj47jp4p9gf45pj-5000.app.github.dev/embeddings', // URL of your Flask API
          {
            texts: [newMessage],
          }
        );

        const embedding = openaiResponse.data.embeddings[0];

        console.log('Generated embedding:', embedding);

        // Query Pinecone for the best match based on the embedding
        const pineconeResponse = await axios.post(
          'https://prof-zteensq.svc.aped-4627-b74a.pinecone.io/query', // Replace with your Pinecone URL
          {
            topK: 10,
            vector: embedding,
            includeValues: true,
          },
          {
            headers: {
              'Api-Key': '0a08e41d-3496-4ed7-ab13-cc523e053940',
              'Content-Type': 'application/json',
            },
          }
        );

        const bestMatch =
          pineconeResponse.data.matches[0].values.toString() ||
          "Sorry, I couldn't find an answer.";

        console.log('Pinecone response:', pineconeResponse.data.matches[0].values.toString());

        // Add the AI's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: bestMatch, isUser: false },
        ]);
      } catch (error) {
        console.error('Error in generating response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: 'An error occurred. Please try again.',
            isUser: false,
          },
        ]);
      }

      setIsLoading(false);
      setNewMessage('');
    }
  };

  return (
    <div>
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
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-black text-white rounded-r-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};
