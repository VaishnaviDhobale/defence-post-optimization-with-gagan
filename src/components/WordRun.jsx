import React, { useState, useEffect } from 'react';

export const WordRun= ({wordArray}) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
      const displayWords = async () => {
        while (true) {
          for (const word of wordArray) {
            for (const char of word) {
              setDisplayedText((prevText) => prevText + char);
              // Replace the setDisplayedText with your display logic
              await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the delay as needed
            }
  
            await new Promise(resolve => setTimeout(resolve, 1500)); // 2-second pause between words
            setDisplayedText('');
          }
        }
      };
  
      displayWords();
    }, []);  // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {/* Display the text as it gets updated */}
      {displayedText}
    </div>
  );
};

