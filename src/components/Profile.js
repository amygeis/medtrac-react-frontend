import React, {useState} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import axios from 'axios';
import './Component.css';
import Header from "./Header";
import Footer from "./Footer";
import UserNav from "./UserNav";
import MyMedList from "./MyMedList";
import MyMedSchedule from "./MyMedSchedule";
import SignUp from "./SignUp";
import AddMed from "./AddMed";
import Home from "./Home";
import LogIn from "./LogIn";

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';

function profile(props){
    return(
        <div className="Profile">
            <UserNav userid={props.userid} name={props.name}/>
            <h1>Welcome to {props.name}'s Profile Page</h1>
            <form onSubmit={props.updateProfile}>
                Name: <input onChange={(e) => props.setName(e.target.value)} type="text" value={props.name} name="name"/> <br></br>
                Username: <input onChange={(e) => props.setUserName(e.target.value)} type="text" value={props.username} name="username"/> <br></br>
                Password: <input onChange={(e) => props.setPassword(e.target.value)} type="password" value={props.password} name="password"/> <br></br>
                <input type="submit" value="Update Profile" 
                />
            </form>
            {props.error && (
                <div className="error">{props.error}</div>
            )}

        </div>
    )
}

export default profile;