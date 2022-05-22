import React from 'react'
// import img from "./images/unsplash.jpg"
import Avatar from '@mui/material/Avatar'
function Post({username, caption , avatar, imageUrl}) {
  return (
    <div className='post'>
      <div className="post_header">
        <Avatar>{avatar}</Avatar>
        <h3>{username}</h3>
      </div>
      <img className='post_img' src={imageUrl} alt='post_image' />
      <h4 className='post_text'><strong>{username}</strong>{caption}</h4>
    </div>
  )
}

export default Post;