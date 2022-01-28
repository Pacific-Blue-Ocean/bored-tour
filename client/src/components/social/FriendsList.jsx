import React, {useState, useEffect} from 'react';
import Friend from './Friend.jsx';

const FriendsList = () => {
  const [friends, setFriends] = useState();
  useEffect(() => {
    axios.get('/friends')
      .then((res) => {
        friends.setFriends(res.data);
      })
  }, [])

  return (
    <div>
      <h1>Friends List</h1>
      <form>
        <input type="text" placeholder="Search/Add Friend" />
        <button type="submit">Submit</button>
      </form>
      <Friend />
      <Friend />
      <Friend />
    </div>
  )
}

export default FriendsList;