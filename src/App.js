import React, {useState} from 'react';
import axios from 'axios'
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserNav from "./components/UserNav";
import MyMedList from "./components/MyMedList";
import MyMedSchedule from "./components/MyMedSchedule";

const backendURL = process.env.REACT_APP_BACKEND_URL  ||'http://localhost:3000/api';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/mymedschedule" render = {()=> <MyMedSchedule />} />
          <Route path="/mymedlist" render = {()=> <MyMedList />} />
        </Switch>
      </main>
       <Footer />
    
    </div>
  );
}

export default App;
