import React from "react";
import {
  Box, Heading, Spacer, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  extendTheme,
 ChakraProvider
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";


export const Header = () => {

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

 return(
    <Box
      backgroundImage="url('./images/RaccoonParty.jpeg')"
      backgroundPosition="25% 70%"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Flex style={{ borderBottom: '5px solid black' }}>
        <Link to="/">
          <Heading as='h1' fontSize='6vh' color='whiteAlpha.900' p={8}
          >bored tour</Heading>
        </Link>
        <Spacer />
        <Box p={4}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Username
          </MenuButton>
          <MenuList>
            <Link to="/events"><MenuItem>My Events</MenuItem></Link>
            <Link to="/friends"><MenuItem>My Friends</MenuItem></Link>
            <Link to="/interests"><MenuItem>My Interests</MenuItem></Link>
            <Link to="/register"><MenuItem>Register</MenuItem></Link>
            <Link to="/login"><MenuItem>Log In</MenuItem></Link>
          </MenuList>
        </Menu>
        </Box>
      </Flex>
    </Box>

  )
}