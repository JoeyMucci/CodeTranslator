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
      try {
        const result = await translateText(text);
        setTranslatedText(result);
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslation();
 }, [text]);

 if (isLoading) {
    return <div>Translating...</div>;
 }

 return <div>{translatedText}</div>;
};

export default TranslationRequest;
