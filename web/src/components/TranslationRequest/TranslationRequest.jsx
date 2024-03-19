import React, { useState, useEffect } from 'react';

// Simulate a long-running translation task
const translateText = async (text) => {
 // Simulate a delay
 await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
 return `Translated: ${text}`;
};

const TranslationRequest = ({ text }) => {
 const [translatedText, setTranslatedText] = useState('');
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    const fetchTranslation = async () => {
      const result = await translateText(text);
      setTranslatedText(result);
      setIsLoading(false);
    };

    fetchTranslation();
 }, [text]);

 if (isLoading) {
    return <div>Translating...</div>;
 }

 return <div>{translatedText}</div>;
};

const App = () => {
 const [requests, setRequests] = useState([
    { id: 1, text: 'Hello, world!' },
    { id: 2, text: 'Goodbye, world!' },
    { id: 3, text: 'How are you?' },
 ]);

 return (
    <div>
      {requests.map((request) => (
        <TranslationRequest key={request.id} text={request.text} />
      ))}
    </div>
 );
};

export default App;
