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

class Meds extends Component {
    constructor(props){
        super()
        this.state={
            newMed:"",
        }
    }
    
    addMed = async(e) => {
        e.preventDefault();
        console.log(this.props.token)
        let newMed = e.target.name.value
        console.log(newMed)
        let response = await axios({method:'post',url:`${backendURL}/medicine`,
        data:{
            name: e.target.name.value
        }, headers: {authorization: `${this.props.token}`}})
        console.log(response.data.newMedicine)
        let temp=this.props.medicines
        temp.push(response.data.newMedicine)
        this.setState({
            medicines: temp,
        })
    }
    
    //  componentDidMount= async() => {
    //     let response = await axios({method:'get',url:`${backendURL}/medicine`,
    //     data:{
    //     }, headers: {authorization: `${this.props.token}`}})
    //     console.log(response.data.medicines)
    //     this.props.setMedicines(response.data.medicines)
    //   }

    allMeds = async() => {
        let response = await axios({method:'get',url:`${backendURL}/medicine`,
        data:{
        }, headers: {authorization: `${this.props.token}`}})
        console.log(response.data.medicines)
        this.props.setMedicines(response.data.medicines)
      }
    

    render(){
        const allMedicines = this.props.medicines.map(med => {
             return <li key={med.id}>
                 {med.name}</li>
        })
        
        return(
            <div className="allmeds">
                <UserNav />
                <h1>List of all Medications</h1> <button onClick={this.allMeds}>all meds</button>

                <div>Don't see a medication?  Add a new one.</div>

                <form onSubmit={this.addMed}>
                Medication name and dosage: <input type="text" name="name" placeholder="new medication" /> <br></br>
                <input type="submit" value="Add Medication" //disabled={!validateFormFields()} 
                />
            </form>

                <ul>
                    {allMedicines}
                </ul>
            </div>
        )
    }
}

export default Meds;