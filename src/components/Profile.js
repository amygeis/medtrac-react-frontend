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
        <div>profile page</div>
    )
}

export default profile;