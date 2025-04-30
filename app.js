import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [chat, setChat] = useState([]);

  const sendPrompt = async () => { 
    if (!prompt) return;

    const userMessage = { role: 'user', content: prompt };
    setChat([...chat, userMessage]);

    const res = await axios.post('http://localhost:5000/api/chat', { prompt });
    const botMessage = { role: 'assistant', content: res.data.reply };
    setChat(prev => [...prev, botMessage]);
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">GPT Chat</h1>
      <div className="space-y-4 max-h-[60vh] overflow-auto mb-4">
        {chat.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <p className="bg-gray-700 inline-block px-4 py-2 rounded-lg">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow px-4 py-2 rounded-l-lg text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="bg-blue-500 px-4 py-2 rounded-r-lg" onClick={sendPrompt}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;