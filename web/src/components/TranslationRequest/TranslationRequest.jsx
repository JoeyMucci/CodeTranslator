import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TranslationRequest = ({ text }) => {
 const [translatedText, setTranslatedText] = useState('');
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    const fetchTranslation = async () => {
      try {
        // Assuming your backend endpoint is at '/api/translate'
        const response = await axios.post('/api/translate', {
          fromLanguage: 'en', // source language
          toLanguage: 'es', // target language
          code: text, // The text to be translated
        });

        setTranslatedText(response.data);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText('Error occurred during translation.');
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

