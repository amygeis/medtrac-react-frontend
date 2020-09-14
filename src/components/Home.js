import React, {useState} from 'react';
import './Component.css';
import {Link} from "react-router-dom";
import axios from "axios";

function Home () {
    return(
        <div>
            <h2><Link to ="/SignUp"> Sign Up </Link> </h2>  
            <h2><Link to ="/LogIn">Log In</Link></h2>
        </div>
    )
}

export default Home;