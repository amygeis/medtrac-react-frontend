import React, {useState} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserNav from "./components/UserNav";
import MyMedList from "./components/MyMedList";
import MyMedSchedule from "./components/MyMedSchedule";
import SignUp from "./components/SignUp";
import AddMed from "./components/AddMed";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';

function profile(props){
    return(
        <div>profile page</div>
    )
}

export default profile;