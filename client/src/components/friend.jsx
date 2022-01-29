import { Flex } from '@chakra-ui/react';
import React from 'react';

const Friend = ( {friend} ) => {
  return (
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>{friend.full_name}</Flex>
  )
}

export default Friend;
