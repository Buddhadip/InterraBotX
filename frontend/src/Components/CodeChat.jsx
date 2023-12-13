// CodeChat.jsx
import React, { useState } from 'react';

const CodeChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleChatResponse = async () => {
    try {
      setIsLoading(true);
  
      // Assuming you want to format the user input before sending it to the API
      const formattedUserInput = `\n${userInput}`;
      
      const response = await fetch('http://localhost:3000/api/code-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: formattedUserInput }),
      });
  
      const data = await response.json();
      setChatResponse(data.chatResponse);
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
      console.log('Error in jsx:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Code Chat</h2>
    <div className="input-area mb-4">
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="border p-2 w-full text-black"
      />
      <button
        onClick={handleChatResponse}
        disabled={isLoading}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mx-auto block"
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </div>

    <div className="output-area">
      <h3 className="text-xl font-bold mb-2 text-white text-left">Chat Response:</h3>
      <div className="mt-8 bg-gray-700 p-4 rounded overflow-auto max-h-60 max-w-70">
        <pre className="text-white text-left">{chatResponse || 'No response yet.'}</pre>
      </div>
    </div>
  </div>
  );
};

export default CodeChat;
