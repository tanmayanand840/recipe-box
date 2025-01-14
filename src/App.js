import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './Components/Mainpage';
import Description from './Components/Description'; // Corrected spelling of "Description"
import './App.css';

function App() {
  return (
    <Router>
      <>
        <h1>RecipeBox</h1>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/:mealid" element={<Description />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
