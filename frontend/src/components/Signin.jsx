import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Alert } from '@mui/material';
import { UserAuth } from "../context/Context";


function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signIn } = UserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signIn(email, password);
            navigate("/account");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <div
                className="modal"
            >
            </div>
            <form className='form_modal signin' onSubmit={handleSubmit}>
                {error&&<Alert severity='error'>{error}</Alert>}
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
