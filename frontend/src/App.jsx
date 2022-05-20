import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import { db, auth } from "./firebase_config.js";
import { getDocs, collection } from 'firebase/firestore';
import { Button, Input } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut
} from "firebase/auth";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentModal, setCurrentModal] = useState("")

  // const [user,setUser] = useState("");
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // })

  const postsCollectionRef = collection(db, 'posts');
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, email, password
      );
      alert(user);
    } catch (error) {
      alert(error.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth, email, password
      );
      alert(user);
    } catch (error) {
      alert(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts();
  }, [])

  return (

    <div className='app'>
      {currentModal === "signup" ? <div>
        <div className='modal'
          onClick={() => setCurrentModal("")}
        >
        </div>
        <form className='form_modal' action="">
          <img
            className='modal_image'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
            alt='IG_logo'
          />
          <Input
            type='text'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={register} >Sign Up</Button>
        </form>
      </div>
        : currentModal === "signin" ?
          <div>
            <div
              className="modal"
              onClick={() => setCurrentModal("")}
            >
            </div>
            <form className='form_modal signin' action="">

              <img
                className='modal_image'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
                alt='IG_logo'
              />

              <Input
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={login} >Login</Button>
            </form>
          </div>
          : <></>
      }
      <div className='app_header'>
        <img
          className='app_headerImage'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
          alt='IG_logo'
        />
      </div>
      <Button onClick={() => setCurrentModal("signin")} >Login</Button>
      <Button onClick={() => setCurrentModal("signup")} >Sign Up</Button>
      <Button onClick={logout}>Logout</Button>

      {/* {user?
      :
      <Button onClick={() => setCurrentModal("signup")} >Sign Up</Button>
      } */}
      {/* {user?user.username:""} */}
      <h1>Welcome to my app!</h1>
      {posts.map((post, id) => (
        <Post key={id} username={`${post.username} `} avatar={post.avatar} caption={post.caption} imageUrl={post.imageUrl} />
      ))}
    </div>

  );
}

export default App;
