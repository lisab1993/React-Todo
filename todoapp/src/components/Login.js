import React, {useState, useContext} from 'react'
import App from "../App.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
  } from "react-router-dom";

import { AppContext } from "../contexts/AppContext.js";
import { token } from "morgan";

const Login = () => {
    const [inputText, setInputText] = React.useState({
        emailText: '',
        passwordText: ''
    })
    return (
        <div>
            
        </div>
    )
}

export default Login
