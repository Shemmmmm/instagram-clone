import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import InputEmoji from 'react-input-emoji';


function Post({ username, caption, avatar, imageUrl }) {
  const [text, setText] = useState('')

  function handleOnEnter(text) {
    console.log('enter', text)
  }

  return (
    <div className='post'>
      <div className="post_header">
        <Avatar>{avatar}</Avatar>
        <h3>{username}</h3>
      </div>
      <img className='post_img' src={imageUrl} alt='post_image' />
      <h4 className='post_text'><strong>{username}</strong>{caption}</h4>
      <div>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Add a comment..."
        />
      </div>
    </div>
  )
}

export default Post;