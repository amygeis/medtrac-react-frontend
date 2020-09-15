import React, {useState} from 'react';
import {Route, Switch, useHistory, withRouter} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserNav from "./components/UserNav";
import MyMedList from "./components/MyMedList";
import Profile from "./components/Profile";
import MyMedSchedule from "./components/MyMedSchedule";
import SignUp from "./components/SignUp";
import AddMed from "./components/AddMed";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';



function App() {
  const [token, setToken] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [cookie, setCookie] = useState('');
  const [error, setError] = useState('');
  const history=useHistory();

  const signup = async(e) => {
    e.preventDefault();
    setError("")
    let name = e.target.name.value;
    let username = e.target.username.value;
    let password = e.target.password.value;
    console.log(name, username, password)
    if(name=="" || username =="" || password ==""){
      console.log("a field was left blank");
      setError("Name, Username, Password cannot be blank")
    }
    else{
      let response = await axios.post(`${backendURL}/auth/signup`, {
        name: name,
        username: username,
        password: password
      })
      console.log(response);
      setLoggedInUser(response.data.newUser.id)
      setLoggedInUserName(response.data.newUser.username)
      setToken(response.data.token);
    }
  }

  const login = async(e) => {
    e.preventDefault();
    setError("")
    let username = e.target.username.value;
    let password = e.target.password.value;
    if(username =="" || password ==""){
      setError("Name, Username, Password cannot be blank")
    }
    else{
      let response = await axios.post(`${backendURL}/auth/login`, {
        username: username,
        password: password
      })
      console.log(response);
      if (response.status!==200){
        setError("Username and Password are not correct or Username is not found")
      }
      else{
        console.log(response)
        let id=response.data.foundUser.id
        setLoggedInUser(response.data.foundUser.id)
        setLoggedInUserName(response.data.foundUser.username)
        setToken(response.data.token);
        console.log(id, loggedInUser, loggedInUserName)
        // <Redirect to={`/profile/${id}`}/>
        history.push({
          pathname: `/profile/${id}`,
          state: {userid:loggedInUser,
                  error:error,
                  username:loggedInUserName,
                  token: token}
        })
      }
    }
  }
 

  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/signup" component = {()=> <SignUp 
            signup={signup} token={token} error={error} />} />
          <Route path="/login" render = {()=> <LogIn 
            login={login} token={token} error={error} /> } />
          <Route path="/mymedschedule" render = {(routerProps)=> <MyMedSchedule {...routerProps}/>} />
          <Route path="/mymedlist" render = {()=> <MyMedList />} />
          <Route path="/addmed" render = {() => <AddMed />} />
          <Route path="/profie/:id" component={(routerProps) => <Profile {...routerProps} />} />
          <Route path="/" component = {()=> <Home />} />
        </Switch>
      </main>
       <Footer />
    
    </div>
  );
}

export default withRouter(App);
