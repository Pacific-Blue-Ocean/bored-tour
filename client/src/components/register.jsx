import React, { useState, useEffect } from "react";
import { Flex, Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, FormHelperText, InputRightElement, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from "axios";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);

  const register = (event) => {
    event.preventDefault();
    registerWithEmailAndPassword(name, email, password);

    const body = {
      email,
      full_name: name,
    }

    axios.post('/api/users/add', body)
  };

  useEffect(() => {
    const navigateToSurvey = () => navigate('/interests');
    if (error) return <img src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1" alt="Error" />;
    if (loading) return <img src="https://images.wondershare.com/mockitt/ux-beginner/loading-time-tips.jpeg" alt="Loading" />;
    if (user) navigateToSurvey();
  }, [user, loading, navigate]);


  return (
    <ChakraProvider theme={theme}>
      <Box
        backgroundImage="url('./images/RaccoonParty.jpeg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100wh"
        height="100vh"
      >
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="brand.100" />
            <Link to="/"><Heading color="brand.500">Bored Tour</Heading></Link>
            <Heading color="brand.500">Register</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="brand.500"
                boxShadow="md"
              >
                <FormControl>
                <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                    />
                    <Input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                    />
                    <Input type="email" placeholder="email address" onChange={(e) => setEmail(e.target.value)}/>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="red"
                  width="full"
                  onClick={register}
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          <Link to="/login"><Heading color="brand.500" size="sm">Sign in for Bored Tours</Heading></Link>
        </Box>
      </Flex>
    </Box>
    </ChakraProvider >
  );
};
