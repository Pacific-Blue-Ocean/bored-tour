import React from 'react';

const Friend = ( {friend} ) => {
  return (
    <div>
      <ul>
        <li>{friend.full_name}</li>
      </ul>
    </div>
  )
}

export default Friend;
