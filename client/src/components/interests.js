import { Box, Flex, Heading, extendTheme } from '@chakra-ui/react';
import React, {useState, useEffect, useRef}  from 'react';
import { Header } from './header';
import Preferences from './preferences/Preferences.jsx';
import { useNavigate } from "react-router-dom";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Interests = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (error) {
      return <img src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1" alt="Error" />;
    }

    if (loading) {
      return <img src="https://images.wondershare.com/mockitt/ux-beginner/loading-time-tips.jpeg" alt="Loading" />;
    }

    if (!user) {
      navigate('/');
    }
  }, [user, loading]);

  if (!user) {
    return null;
  }

  return (
  <Box>
    <Header />
    <Box p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading fontSize='5vh'>Interests</Heading>
      <Preferences userId={1} />
    </Box>
  </Box>
  )
}

export default Interests;