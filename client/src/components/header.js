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


export const Header = () => {


 return(
    <div className="headerContainer">
      <div className="headerBackGround">
        <div className="header" >
          <Flex>
            <Link to="/">
              <Heading as='h1' h='11.5vh' fontSize='6vh' color='brand.400' p={8}
              >bored tour
              </Heading>
            </Link>
            <Spacer />
            <Box p={4}>
            <Menu>
              <MenuButton color='brand.400' as={Button} rightIcon={<ChevronDownIcon />}>
              Username
              </MenuButton>
              <MenuList  color='brand.400'>
                <Link to="/events"><MenuItem>My Events</MenuItem></Link>
                <Link to="/friends"><MenuItem>My Friends</MenuItem></Link>
                <Link to="/interests"><MenuItem>My Interests</MenuItem></Link>
                <Link to="/register"><MenuItem>Register</MenuItem></Link>
              </MenuList>
            </Menu>
            </Box>
          </Flex>
        </div>
      </div>
    </div>

  )
}