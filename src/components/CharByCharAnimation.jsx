import React, { useState, useEffect } from 'react';
import '../css/navbar.css'; // Create this CSS file for styling
import { Text } from "@chakra-ui/react"

export const CharByCharAnimation = ({ wordArray }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentWordIndex((prevWordIndex) => (prevWordIndex + 1) % wordArray.length);
    }, 2000); // Change words every 2 seconds (adjust the interval as needed)

    return () => clearInterval(animationInterval);
  }, [wordArray]);

  return (
    <Text>
      {wordArray[currentWordIndex]}
    </Text>
  );
};
