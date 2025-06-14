import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Dashboard';
import Description from './pages/Description';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentDetails from './pages/IncidentDetails';
function App() {
  return (
    <div className="App">
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/News" element={< Description/>} />
<Route path="/incident/:id" element={<IncidentDetails />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
