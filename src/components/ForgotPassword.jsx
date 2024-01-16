import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { baseUrl } from '../BaseUrl';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send a POST request to your server to initiate the password reset
      let res = await axios.post(`${baseUrl}/forgetpassword/sendPasswordResetEmail`, { email });
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      // Extract the error message from the error object
      const errorMessage = error.response?.data?.error || 'An error occurred.';
      setMessage(errorMessage);
    }

    setIsLoading(false);
  };

  return <>
    <Navbar />
    <Box maxW="400px" mx="auto" mt="4">
      <Heading as="h2" fontSize="2xl" mb="4">
        Forgot Password
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <FormErrorMessage>Email is required</FormErrorMessage>
        </FormControl>
        <Button
          mt="4"
          backgroundColor={"#29a4de"}
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting"
          color={"white"}
          fontWeight={"500"}
        >
          Reset Password
        </Button>
      </form>
      {message && (
        <Text mt="4" color="green">
          {message}
        </Text>
      )}
    </Box>
    </>
};

