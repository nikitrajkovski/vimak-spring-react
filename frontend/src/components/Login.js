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
    
        console.log('Submitting with:', { username, password });


        try {
            //made new changes
            // const response = await axios.post(
            //     LOGIN_URL,
            //     { username, password },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         withCredentials: true,
            //     }
            // );
    
            // const accessToken = response.data.accessToken;
            // sessionStorage.setItem('token', accessToken);
            // sessionStorage.setItem('username', response.data.userName);
            await login(username, password); // Pass username and password directly to the login function
            navigate('/');
            if (response.status === 200) {
                login();
                console.log('Login successful');
            }
        } catch (error) {
            console.error('Login error:', error);
            console.log('Invalid credentials');
        }
    };

    return (
        <div id='login'>
            <Navbar/>
            <div className='celastrana'>        
                <div className="loginwindow">
                <form onSubmit={(e) => handleLoginSubmit(e)} className="login-form">                        
                <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) =>{
                                console.log('Username changed:', e.target.value);
                                setUsername(e.target.value)}
                            } 
                            placeholder="Enter your username"
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                console.log('Password changed:', e.target.value);
                                setPassword(e.target.value)}
                            }
                            placeholder="Enter your password"
                            required
                        />
                        </div>
                        <button type="submit" className="btn formButton">Login</button>
                    </form>
                </div>

            </div>
            <div className="footer" style={{borderTop:"1px solid grey"}}>
                    <div className="f1">
                        <div id="kontakt">Контакт:</div>
                        <div className='kf1'>Е-пошта: vimak@vimak.com</div>
                        <div className='kf1'>Телефон: 070/000-000</div>
                        <br></br>
                        <div>Сите права се задржани</div>
                    </div>
                    <div className="f2">
                      <div className='f2Logo'>
                            <Logo/>
                          </div>
                    </div>
                    <div className="f3">
                    <br/>
                        <div id="politika">Политика на приватност</div>
                        <div>Услови за купување</div>
                    </div>
                </div>
        </div>
        )
}