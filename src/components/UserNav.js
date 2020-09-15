import React, {useState} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import axios from 'axios';
import './Component.css';
import Header from "./Header";
import Footer from "./Footer";
import MyMedList from "./MyMedList";
import MyMedSchedule from "./MyMedSchedule";
import SignUp from "./SignUp";
import AddMed from "./AddMed";
import Home from "./Home";
import LogIn from "./LogIn";

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';

function UserNav(props){
    return(
        <div className="usernav">
            <div><Link to ="/meds"> Medicines </Link></div>
            <div><Link to ="/mymedschedule"> My Medication Schedule </Link></div>
            <div><Link to ="/mymedlist"> My List of Medications </Link></div>
            <div>
                Welcome {props.name}!
                <Link to ="/logout">Logout </Link>
            </div>
        </div>
    )

}
export default UserNav