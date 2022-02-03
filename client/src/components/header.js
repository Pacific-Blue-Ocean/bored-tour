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
  extendTheme
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import { auth, logout } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom'

export const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const path = useLocation().pathname;

 return (
    <div className="headerContainer">
      <div className={path === '/' ? '' : "headerBackGround"}>
        <div className="header">
          <Flex>
            <Link to="/">
              <Heading as='h1' h='11.5vh' fontSize='6vh' color='brand.400' p={8}>
                bored tour
              </Heading>
            </Link>
            <Spacer />
            <Box p={4}>
            <Menu>
              <MenuButton padding='1vw' fontSize='2.5vh' color='brand.400' as={Button} rightIcon={<ChevronDownIcon />}>
              {user ? user.email : "Menu"}
              </MenuButton>
              <MenuList fontSize='2.5vh' color='brand.400'>
                {user ? <Link to="/events"><MenuItem>My Events</MenuItem></Link> : null}
                {user ? <Link to="/friends"><MenuItem>My Friends</MenuItem></Link> : null}
                {user ? <Link to="/interests"><MenuItem>My Interests</MenuItem></Link> : null}
                {user ? <Link to="/" onClick={logout}><MenuItem>Log Out</MenuItem></Link> : null}
                {user ? null : <Link to="/login"><MenuItem>Log In</MenuItem></Link>}
                {user ? null : <Link to="/register"><MenuItem>Register</MenuItem></Link>}
              </MenuList>
            </Menu>
            </Box>
          </Flex>
        </div>
      </div>
    </div>
  )
}