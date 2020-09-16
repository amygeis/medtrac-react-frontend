import React, {useState} from 'react';
import {Route, Switch, useHistory, withRouter} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserNav from "./components/UserNav";
import MyMedList from "./components/MyMedList";
import Meds from "./components/Meds";
import Profile from "./components/Profile";
import MyMedSchedule from "./components/MyMedSchedule";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';



function App() {
  const [token, setToken] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [cookie, setCookie] = useState('');
  const [error, setError] = useState('');
  const [medicines, setMedicines] =useState([])
  const history=useHistory();

  const signup = async(e) => {
    e.preventDefault();
    setError("")
    let name = e.target.name.value;
    let username = e.target.username.value;
    let password = e.target.password.value;
    console.log(name, username, password)
    if(name==="" || username ==="" || password ===""){
      console.log("a field was left blank");
      setError("Name, Username, Password cannot be blank")
    }
    else{
      let response = await axios.post(`${backendURL}/auth/signup`, {
        name: name,
        username: username,
        password: password
      },{withCredentials:true})
      console.log(response);
      if (response.status!==200){
        setError("Error from server")
      }
      else{
        console.log(response)
        let id=response.data.newUser.id
        setLoggedInUserId(id)
        setLoggedInUser(response.data.newUsername)
        setLoggedInUserName(response.data.newUserusername)
        setuserPassword(response.data.newUser.password)
        setToken(response.data.token);
        console.log(id, loggedInUser, loggedInUserName)
        // <Redirect to={`/profile/${id}`}/>
        history.push({
          pathname: `/profile/${id}`,
          state: {userid:loggedInUserId,
                  name: loggedInUser,
                  error:error,
                  username:loggedInUserName,
                  password:userPassword,
                  token: token}
        })
      }
    }
  }

  const login = async(e) => {
    e.preventDefault();
    setError("")
    let username = e.target.username.value;
    let password = e.target.password.value;
    if(username ==="" || password ===""){
      setError("Name, Username, Password cannot be blank")
    }
    else{
      console.log("login click")
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
        setLoggedInUserId(id)
        setLoggedInUser(response.data.foundUser.name)
        setLoggedInUserName(response.data.foundUser.username)
        setuserPassword(response.data.foundUser.password)
        setToken(response.data.token);
        console.log(id, loggedInUser, loggedInUserName)
        // <Redirect to={`/profile/${id}`}/>
        history.push({
          pathname: `/profile/${id}`,
          state: {userid:loggedInUserId,
                  name: loggedInUser,
                  error:error,
                  username:loggedInUserName,
                  password:userPassword,
                  token: token}
        })
      }
    }
  }

  const updateProfile = async(e)=>{
    e.preventDefault();
    setError("");
    let name = e.target.name.value;
    let username = e.target.username.value;
    let password = e.target.password.value;
    console.log(name, username, password)
    if(name==="" || username ==="" || password ===""){
      console.log("a field was left blank");
      setError("Name, Username, Password cannot be blank")
    }
    else{
      console.log(token)
      let response = await axios({method:'put',url:`${backendURL}/users/profile/${loggedInUserId}`, 
      data:{
        // headers: {"Authorization" : `Bearer ${token}`},
        name: name,
        username: username,
        password: password}     
      ,headers: {authorization : `${token}`}})
      console.log(response);
      if (response.status!==200){
        setError("Error from server")
      }
      else{
        console.log(response)
        setLoggedInUser(response.data.name)
        setLoggedInUserName(response.data.username)
        setuserPassword(response.data.password)
        setToken(response.data.token);
        setError("Profile updated successfully")
      }
    }
  }
  
  // const logout =async()=>{
  //   setError("")
  //   let response = await axios.get(`${backendURL}/auth/logout)
  //   console.log(response)
  //   if (response.status=200) {

  //   }


  // }

  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/signup" component = {()=> <SignUp 
            signup={signup} token={token} error={error} />} />
          <Route path="/login" component = {()=> <LogIn 
            login={login} token={token} error={error} /> } />
          <Route path="/mymedschedule" component = {(routerProps)=> <MyMedSchedule {...routerProps}/>} />
          <Route path="/mymedlist" component = {()=> <MyMedList />} />
          <Route path="/meds" component = {() => <Meds 
          medicines={medicines} setMedicines={setMedicines} token={token}/>} />
          <Route path="/profile/:id" component={(routerProps) => <Profile {...routerProps} 
            userid={loggedInUserId} name={loggedInUser} username={loggedInUserName} password={userPassword}
            setName={setLoggedInUser} setUserName={setLoggedInUserName} setPassword={setuserPassword} 
            updateProfile={updateProfile}  />} />
          <Route path="/" component = {()=> <Home />} />
        </Switch>
      </main>
       <Footer />
    
    </div>
  );
}

export default withRouter(App);
