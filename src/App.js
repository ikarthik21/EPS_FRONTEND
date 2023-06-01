// OM NAMASHIVAYA 
// JAI SHREE RAM 

import './App.css';
import Home from './Components/Home/Home';
import TopNav from './Components/Home/Navigate/TopNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNav from './Components/Home/Navigate/SideNav';
import Login from './Components/Home/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import AllRecords from './Components/Dashboard/AllRecords';
import SingleCase from './Components/Dashboard/SingleCase';
import Cookies from 'js-cookie';


function App() {

  const token = Cookies.get('token');




  return (
    <div  >
      <BrowserRouter>
        <TopNav />
        <Routes>
          {token ?
            <>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/allrec' element={<AllRecords />} />
              <Route path='/home' element={<SideNav />} />
              <Route exact path="/cases/:caseid" element={<SingleCase />} />
            </>
            :
            <>

              <Route path='/' element={<Home />} />

              <Route path='/login' element={<Login />} /></>
          }


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
