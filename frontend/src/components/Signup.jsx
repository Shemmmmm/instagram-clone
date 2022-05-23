import React, { useState } from 'react';
import { Button, Input, Alert } from '@mui/material';
import {Link,useNavigate} from "react-router-dom";
import { UserAuth } from "../context/Context";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {createUser} = UserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await createUser(username,email,password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div>
            <div className='modal'
            >
            </div>
            <form className='form_modal' onSubmit={handleSubmit}>
                <Alert>{error}</Alert>
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
                <Button type="submit">Sign Up</Button>
                
                <p className='paragraph'>Have an account?<span><Link className='link' to="/"> Sign In </Link></span></p>
            </form>
        </div>
    )
}

export default Signup;