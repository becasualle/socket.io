import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const sendMessage = () => {
    socket.emit('onSendMessage', { message: 'Hello world!' });
  };

  return (
    <>
      <input type="text" placeholder="message..." />
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
}

export default App;
