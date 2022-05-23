import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Input } from '@mui/material';


function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div
                className="modal"
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
                <Button type="submit">Login</Button>
                <p className="paragraph">Don't have an acount?<span><Link className='link' to="/signup"> Sign Up </Link></span></p>
            </form>
            
        </div>
    );
}

export default Signin;
