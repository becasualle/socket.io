import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = () => {
    socket.emit('onSendMessage', { message });
    setMessage('');
  };

  useEffect(() => {
    socket.on('onReceiveMessage', (data) => {
      setReceivedMessage(data.message);
    });

    return () => {
      socket.off('onReceiveMessage');
    };
  }, []);

  return (
    <>
      <input
        type="text"
        value={message}
        placeholder="message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {receivedMessage}
    </>
  );
}

export default App;
