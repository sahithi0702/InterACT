import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AvailableTests from './Userfolder/Availabletest.js';
import Leaderboard from './Userfolder/Leaderboard.js';
import Userhome from './Userfolder/Userhome.js';
import Home from './Userfolder/Home.js';
import Login from './Formfolder/Login.js';
import Register from './Formfolder/Register.js';
import Admin from './Formfolder/Admin.js';
import Adminmainpage from './Adminfolder/Adminmainpage.js';
import Adminhome from './Adminfolder/Adminhome.js';
import AdminavailableTests from './Adminfolder/Adminavailabletests.js';
import Adminleaderboard from './Adminfolder/Adminleaderboard.js';
import TestAnalysis from './Adminfolder/TestAnalysis.js';
import Scoredisplay from './puzzle1/Scoredisplay.js';

import Clue1 from './puzzle1/Clue1.js';
import Clue2 from './puzzle1/Clue2.js';
import Clue3 from './puzzle1/Clue3.js';
import Clue4 from './puzzle1/Clue4.js';
import Clue6 from './puzzle1/Clue6.js';
import Clue5 from './puzzle1/Clue5.js';
import Clue7 from './puzzle1/Clue7.js';
import Clue8 from './puzzle1/Clue8.js';
import Clue9 from './puzzle1/Clue9.js';
import Clue10 from './puzzle1/Clue10.js';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/Userhome' element={<Userhome/>} />
      <Route path="/Register" element={<Register />} />
      <Route path='/Availabletests' element={<AvailableTests/>}></Route>
      <Route path='/Leaderboard' element={<Leaderboard/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/Admin' element={<Admin/>}></Route>
      <Route path='/Adminmainpage' element={<Adminmainpage/>}></Route>
      <Route path='/Adminhome' element={<Adminhome/>}></Route>
      <Route path='/AdminavailableTests' element={<AdminavailableTests/>}></Route>
      <Route path='/Adminleaderboard' element={<Adminleaderboard/>}></Route>
      <Route path='/Testanalysis' element={<TestAnalysis/>}></Route>
      <Route path='/Scoredisplay' element={<Scoredisplay/>}></Route>
      <Route path='/Clue1' element={<Clue1/>}></Route>
      <Route path='/Clue2' element={<Clue2/>}></Route>
      <Route path='/Clue3' element={<Clue3/>}></Route>
      <Route path='/Clue4' element={<Clue4/>}></Route>
      <Route path='/Clue5' element={<Clue5/>}></Route>
      <Route path='/Clue6' element={<Clue6/>}></Route>
      <Route path='/Clue7' element={<Clue7/>}></Route>
      <Route path='/Clue8' element={<Clue8/>}></Route>
      <Route path='/Clue9' element={<Clue9/>}></Route>
      <Route path='/Clue10' element={<Clue10/>}></Route>
    </Routes>
    
    </div>
  );
}

export default App;