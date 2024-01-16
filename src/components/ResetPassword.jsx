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
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from "../BaseUrl";


export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let {id,token} = useParams()

  let navigate = useNavigate()
  const handleEmailChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send a POST request to your server to initiate the password reset
      let res = await axios.post(`${baseUrl}/forgetpassword/updatePassword/${id}/${token}`, { password });
      if(res.status === 200){
        navigate("/login")
      }
      
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
        Update Password
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Enter New Password</FormLabel>
          <Input
            type="text"
            placeholder="Enter new password"
            value={password}
            onChange={handleEmailChange}
          />
          <FormErrorMessage>password is required</FormErrorMessage>
        </FormControl>
        <Button
          mt="4"
          backgroundColor={"#28a4de"}
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting"
          color={"white"}
          fontWeight={"500"}
        >
          Update Password
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

