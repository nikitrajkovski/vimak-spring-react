import * as React from 'react';
import {request} from '../axios_helper'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import classNames from 'classnames';
import Navbar from './hero/navbar'
import './Login.css';
import Logo from './hero/Logo'
import { useAuth } from './authentication/AuthContext';

const LOGIN_URL="http://localhost:8090/api/auth/signin"
export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
    

        try {
            await login(username, password);
            navigate('/');
            if (response.status === 200) {
                login();
            }
        } catch (error) {
            
        }
    };

    return (
        <div id='login'>
            <Navbar/>
            <div className='celastrana'>        
                <div className="loginwindow">
                <form onSubmit={(e) => handleLoginSubmit(e)} className="login-form">                        
                <div className="form-group">
                        <label htmlFor="username">Корисничко име</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) =>{
                                setUsername(e.target.value)}
                            } 
                            placeholder="Внесете го вашето корисничко име"
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Лозинка</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)}
                            }
                            placeholder="Внесете ја вашата лозинка"
                            required
                        />
                        </div>
                        <button type="submit" className="btn formButton">Најава</button>
                    </form>
                </div>

            </div>
        </div>
        )
}