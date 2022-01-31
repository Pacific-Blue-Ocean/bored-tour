import React, { useState } from "react";
import { Flex, Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, FormHelperText, InputRightElement, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30",  //black {header}
        200: "#8DD8E0",  //blue {border color}
        300: "#E3444B",  //red  {buttons}
        400: "#EC7C71",  //orange {button border}
        500: "#FBFAFA",  //white {subheaders, text}
      },
    },
  })


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
            <Heading color="brand.500">Log In</Heading>
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
                    <Input type="email" placeholder="email address" />
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
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    {/* need to create a page to find password? */}
                    <Heading size="xs">forgot password?</Heading>
                    {/* <Link to="">forgot password?</Link> */}
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="red"
                  width="full"
                >
                  Log in
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          <Link to="signup"><Heading color="brand.500" size="sm">Sign up for Bored Tours</Heading></Link>
        </Box>
      </Flex>
    </Box>
    </ChakraProvider >
  );
};
