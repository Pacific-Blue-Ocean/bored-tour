import { Flex, Box, Button } from '@chakra-ui/react';
import React from 'react';

const Friend = ({ friend }) => {
  console.log(friend);

  return (
    <Flex
      flexDirection="row"
      p={4} m={4}
      border='1px'
      borderRadius='10px'
      borderColor='#8F8F8F'
    >
      {friend.full_name}<br />
      Location: {friend.location_id}<br />
      {friend.friend ? null : <Button>Add Friend</Button>}
    </Flex>
  )
}

export default Friend;