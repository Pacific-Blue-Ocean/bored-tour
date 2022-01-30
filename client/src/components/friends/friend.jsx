import { Flex, Box, Button } from "@chakra-ui/react";
import React, {useState} from "react";
import axios from "axios";

const Friend = ({ user_id, friend }) => {
  const [isFriend, setIsFriend] = useState(friend.friend);

  const handleClick = (e) => {
    const request = e.target.value;
    const body = {
      user_id: user_id,
      friend_id: parseInt(friend.id)
    }

    if (request === 'add') {
      axios.post('/api/friends', body);
    } else if (request === 'remove') {
      axios.delete('/api/friends/', { data: body });
    }

    setIsFriend(!isFriend);
  };

  return (
    <Flex
      flexDirection="column"
      p={4}
      m={4}
      border="1px"
      borderRadius="10px"
      borderColor="#8F8F8F"
    >
      {friend.full_name}
      <br />
      {friend.location}
      <br />
      {isFriend ? (
        <Button m={2} onClick={(e) => {handleClick(e)}} value="remove">
          ❌ &nbsp; Remove
        </Button>
      ) : (
        <Button m={2} onClick={handleClick} value="add">➕ &nbsp; Add</Button>
      )}
    </Flex>
  );
};

export default Friend;
