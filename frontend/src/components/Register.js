import * as React from 'react';
import {request} from '../axios_helper'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import classNames from 'classnames';
import Navbar from './hero/navbar'
import './Login.css'
import Logo from './hero/Logo'

const LOGIN_URL="http://localhost:8090/api/auth/signup" //register
export default function Logout() {

    const [username, setUsername] = useState('')
    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({username,email, password}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true,
                    },
                }
            )

            const accessToken = response.data.accessToken
            sessionStorage.setItem('token', accessToken)
            sessionStorage.setItem('username', response.data.userName)
            if (response.status === 200) {
                navigate('/login')
                console.log("ok")
            }
        } catch (error) {
            console.log('Invalid credentials')
        }
    }

    return (
        <div id='login'>
            <Navbar/>
            <div className='celastrana'>        
                <div class="container1">
                    <form onSubmit={handleRegisterSubmit} class="login-form">
                        <div class="form-group">
                        <label for="username">Корисничко име</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Внесете го вашето корисничко име"
                            required
                        />
                        </div>
                        <div class="form-group">
                        <label for="email">Електронска пошта</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => SetEmail(e.target.value)}
                            placeholder="Внесете ја вашата електронска пошта"
                            required
                        />
                        </div>
                        <div class="form-group">
                        <label for="password">Лозинка</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Внесете ја лозинката"
                            required
                        />
                        </div>
                        <button type="submit" class="btn formButton">Регистрација</button>
                    </form>
                    
                </div>
                
            </div>           
        </div>
        )
}