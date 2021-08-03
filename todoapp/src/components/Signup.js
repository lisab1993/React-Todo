import React, { useState, useContext } from 'react'
import Login from "./Login.js"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";
import { AppContext } from "../contexts/AppContext.js";
import { token } from "morgan";

const Signup = () => {
    const [inputText, setInputText] = React.useState({
        usernameText: '',
        passwordText: '',
        emailText: ''
    })
    const [signupPage, setSignupPage] = useState(true)
    const history = useHistory()

    function handleChange(event) {
        const value = event.target.value
        setInputText({
            ...inputText,
            [event.target.name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: inputText.usernameText, email: inputText.emailText, password: inputText.passwordText }),
        };
        const passInput = parseInt(inputText.passwordText.length)
        const usernameInput = parseInt(inputText.usernameText.length)

        if (passInput <= 4) {
            alert('Passwords must be at least 4 characters long, please try again.')
        }
        else if (usernameInput <= 2) {
            alert('Usernames must be at least 2 characters long, please try again.')
            //check if username is taken
        }
        else {
            fetch("/users/register", options)
                .then(res => res.json())
                // .then(res => console.log(res.status, 'signup response'))
                .then(res => {
                    if (res.status == 'success') {
                        setSignupPage(false)
                        history.push('/Login')
                    } else {
                        alert('Email address is invalid. You may only have one accont associated with your email.')
                    }
                })
        }

        return (
            <div>
                <Router>
                    {signupPage ? (
                        <div>
                            <h1>Sign Up Here!</h1>
                            <form onSubmit={handleSubmit}>
                                {/* Username  */}
                                <input
                                    type="text"
                                    value={inputText.usernameText}
                                    name="usernameText"
                                    placeholder="username..."
                                    onChange={handleChange}
                                />

                                <br></br>

                                {/* Password */}
                                <input
                                    type="password"
                                    value={inputText.passwordText}
                                    placeholder="password..."
                                    name="passwordText"
                                    onChange={handleChange}
                                />

                                <br></br>

                                {/* Email  */}
                                <input
                                    type="email"
                                    value={inputText.emailText}
                                    placeholder="email..."
                                    name="emailText"
                                    onChange={handleChange}
                                />

                                <br></br>

                                {/* Button  */}
                                <button className="sign-log-button" type="submit">
                                    {/* <Link onClick={() => setSignupPage(false)} to="/login">SUBMIT</Link> */}
                                    SUBMIT
                                </button>
                            </form>

                            {/* Link to login */}
                            <div>
                                <Link
                                    className="sign-log-links"
                                    onClick={() => setSignupPage(false)}
                                    to="/login">
                                    Already have an account? Login here!
                                </Link>
                            </div>

                        </div>
                    ) : (
                        <div>

                        </div>
                    )}

                </Router>
            </div>
        )
    }

    export default Signup
