import React, {Component} from 'react';
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
import { render } from '@testing-library/react';

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';

class Meds extends Component(){
    constructor(props){
        super()
    }
    
    
    // useEffect(() => {
    //     let response = axios.get(`${backendURL}/medicine`)
    //     console.log(response)
    //     // props.setMedicines(response.data)
    // }, [])
    
    
    componentDidMount = async() => {
        let response = await axios.get(`${backendURL}/medicine`)
        console.log(response.data)
        this.setState({
            medicines:response.data
        })
      }

    render(){
        return(
            <div>Med list</div>
        )
    }
}

export default Meds;