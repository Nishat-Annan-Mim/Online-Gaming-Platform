// components/Chat.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ room }) => {
  const [socket] = useState(() => io()); // Connect to server
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Join a default room (could be game-specific)
    socket.emit('joinRoom', { room: room });

    // Listen for incoming messages
    socket.on('receiveMessage', ({ message, sender }) => {
      setMessages(prev => [...prev, { sender, text: message }]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, [socket, room]);

  const sendMessage = () => {
    if (!input) return;
    // Emit message to server, and also add to local chat
    socket.emit('sendMessage', { room: room, message: input });
    setMessages(prev => [...prev, { sender: 'You', text: input }]);
    setInput('');
  };

  return (
    <div>
      <h3>Game Chat</h3>
      <div style={{ border: '1px solid #ccc', padding: '8px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Type your message..." 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
