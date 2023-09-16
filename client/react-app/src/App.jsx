import './App.css';

function App() {
  const sendMessage = () => {};

  return (
    <>
      <input type="text" placeholder="message..." />
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
}

export default App;
