import * as React from 'react';
import {request} from '../axios_helper'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import classNames from 'classnames';
import Navbar from './hero/navbar'
import './Login.css'
import Logo from './hero/Logo'

const LOGIN_URL="http://localhost:8090/api/auth/signin"
export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({username, password}),
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
                navigate('/')
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
                    <form onSubmit={handleLoginSubmit} class="login-form">
                        <div class="form-group">
                        <label for="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                        </div>
                        <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        </div>
                        <button type="submit" class="btn formButton">Login</button>
                    </form>
                </div>
                <hr/>

            </div>
            <hr/>
            <div className="footer">
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