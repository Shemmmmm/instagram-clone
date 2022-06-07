import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from "../firebase_config.js";
import { UserAuth } from "../context/Context";
import { Navigate } from "react-router-dom";

function Account() {
    const postsCollectionRef = collection(db, 'posts');
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [caption, setCaption] = useState("");
    const [avatar, setAvatar] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { logout, user } = UserAuth();

    const array = { ...user.email };
    let string = "";
    for (let x in array) {
        if (array[x] === "@") break;
        string += array[x];
    }

    const createUser = async (e) => {
        e.preventDefault();
        await addDoc(postsCollectionRef, { username, avatar, caption, imageUrl });
        setAvatar('');
        setUsername('');
        setCaption('');
        setImageUrl('');
    }

    useEffect(() => {

        if (user === null) {
            Navigate("/");
        }
    }, [user]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getPosts();
    }, []);

    return (
        <div>
            <div className='app_header'>
                <img
                    className='app_headerImage'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
                    alt='IG_logo'
                />
                <div>
                    <div className="menu"><hr /><hr /><hr />
                        <div className='menu_content'>
                            <div className='user'>{string}</div>
                            <Button onClick={logout} className="logout">Logout</Button>
                        </div>
                    </div>

                </div>
            </div>
            <h1 className='heading'>Welcome to my app!</h1>
            <form className='post_action' onSubmit={createUser}>
                <input type="text" id='username' value={username} placeholder='username' onChange={(event) => setUsername(event.target.value)} required />
                <input type="text" value={caption} id='caption' placeholder='caption' onChange={(event) => setCaption(event.target.value)} required />
                <input type="text" value={avatar} id='avatar' placeholder='avatar' onChange={(event) => setAvatar(event.target.value)} required />
                <input type="url" value = {imageUrl} id='imageUrl' placeholder='imageUrl' onChange={(event) => setImageUrl(event.target.value)} required />
                <input type="reset" value="Reset"/>
                <Button type='submit'>Post</Button>
            </form>

            {posts.map((post, id) => (
                <Post key={id} username={`${post.username} `} avatar={post.avatar} caption={post.caption} imageUrl={post.imageUrl} />
            ))}
        </div>
    )
}

export default Account;
