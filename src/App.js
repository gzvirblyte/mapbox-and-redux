import React from 'react';
import Map from './Components/Map';
//import { useSelector } from 'react-redux';
import './App.css';

function App() {
  //redux stuff
  //const counter = useSelector(state => state.counter);

  return (
    <div className="App">
    <h1>Interactive Vilnius map</h1>
    <Map />
   

    </div>
  );
}

export default App;
