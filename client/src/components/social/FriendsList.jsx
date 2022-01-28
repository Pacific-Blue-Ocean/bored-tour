import React from 'react';
import Friend from './Friend.jsx';

const FriendsList = () => {
  return (
    <div>
      <h1>Friends List</h1>
      <p>
        <input type="text" placeholder="Search/Add Friend" />
        <button>Search</button>
      </p>
      <Friend />
      <Friend />
      <Friend />
    </div>
  )
}

export default FriendsList;