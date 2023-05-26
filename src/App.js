// OM NAMASHIVAYA 
// JAI SHREE RAM 

import './App.css';
import Home from './Components/Home/Home';
import TopNav from './Components/Home/Navigate/TopNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNav from './Components/Home/Navigate/SideNav';
import Login from './Components/Home/Login/Login';



function App() {
  return (
    <div  >
      <BrowserRouter>
        <TopNav />
        <Routes>

          <Route path='/home' element={<SideNav />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>





    </div>
  );
}

export default App;
