import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';

function LogIn (props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    return(
        <div>
            <h3>Log In to view your Medications</h3>
            <form onSubmit={props.login}>
                Username: <input onChange={(e) => setUserName(e.target.value)} type="text" value={userName} name="username"/> <br></br>
                Password: <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} name="password"/> <br></br>
                <input type="submit" value="LogIn" />
            </form>
            {props.error && (
                <div className="error">{props.error}</div>
            )}
        </div>
    )
}

export default LogIn;
