import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');
  const joinRoom = () => {
    if (room !== '') {
      socket.emit('onJoinRoom', room);
    }
  };

  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const sendMessage = () => {
    socket.emit('onSendMessage', { message, room });
    setMessage('');
  };

  useEffect(() => {
    socket.on('onReceiveMessage', (message) => {
      setReceivedMessage(message);
    });

    return () => {
      socket.off('onReceiveMessage');
    };
  }, []);

  return (
    <>
      <input
        type="text"
        value={room}
        placeholder="Room Number..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <input
        type="text"
        value={message}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {receivedMessage}
    </>
  );
}

export default App;
