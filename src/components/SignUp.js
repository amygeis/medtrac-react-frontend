import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';

function SignUp (props) {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function validateFormFields(){
        return (name.length >0 && userName.lengh >0 && password.length >0 );
    }


    return(
        <div>
            <h3>Sign Up for an account!  Free!</h3>
            <form onSubmit={props.signup}>
                Name: <input onChange={(e) => setName(e.target.value)} type="text" value={name} name="name"/> <br></br>
                Username: <input onChange={(e) => setUserName(e.target.value)} type="text" value={userName} name="username"/> <br></br>
                Password: <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} name="password"/> <br></br>
                <input type="submit" value="SignUp" //disabled={!validateFormFields()} 
                />
            </form>
            {props.error && (
                <div className="error">{props.error}</div>
            )}
            <div>Already have an account?  <Link to="/LogIn">Log In</Link></div>
        </div>
    )
}

export default SignUp;
