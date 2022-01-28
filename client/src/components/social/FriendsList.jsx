import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Friend from './Friend.jsx';

const FriendsList = () => {
  const [id, setUserId] = useState(1);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('/friends', { params: {id}} )
      .then((res) => {
        setFriends(res.data);
      })
  }, [id])



  return (
    <div>
      <h1>Friends List</h1>
      <form>
        <input type="text" placeholder="Search/Add Friend" />
        <button type="submit">Submit</button>
      </form>
      {friends.length ? friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
        />
      )) : null}
    </div>
  )
}

export default FriendsList;

/*

*/