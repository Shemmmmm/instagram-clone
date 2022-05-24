import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import { getDocs, collection } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from "../firebase_config.js";
import { UserAuth } from "../context/Context";
import { Navigate } from "react-router-dom";
function Account() {
    const postsCollectionRef = collection(db, 'posts');
    const [posts, setPosts] = useState([]);
    const [play, setPlay] = useState("");
    const [animate, setAnimate] = useState("");
    const [anim, setAnim] = useState("");
    const { logout, user } = UserAuth();
    const array = {...user.email};
    let string = "";
    for (let x in array){
        if(array[x] === "@") break;
        string += array[x];
    }
    console.log(string);
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

            <div className="radio">
                <div title='Double click to play previous music' onClick={() => { animate === "animate" ? setAnimate("") : setAnimate("animate") }} className={`reverse play_btn ${animate}`}>
                    <hr />
                    <div></div>
                </div>
                <div className="play_btn" title={play === "play" ? "Pause" : "Play"}>
                    {play === "play" ? <div onClick={() => setPlay("")} className="play_pause">
                        <hr />
                        <hr />
                    </div> :
                        <div onClick={() => setPlay("play")} className="forward play">
                            <div></div>
                        </div>
                    }
                </div>
                <div title='Double click to play the next music' onClick={() => { anim === "anim" ? setAnim("") : setAnim("anim") }} className={`forward play_btn ${anim}`}>
                    <div></div>
                    <hr />
                </div>
            </div>

            {posts.map((post, id) => (
                <Post key={id} username={`${post.username} `} avatar={post.avatar} caption={post.caption} imageUrl={post.imageUrl} />
            ))}

        </div>
    )
}

export default Account;
