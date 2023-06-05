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
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Admin from './Components/Admin/Admin';

function App() {

  const token = Cookies.get('token');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Get the JWT token from wherever you have it stored (e.g., local storage)

    if (token) {
      // Decode the JWT token to extract the user role
      const decodedToken = jwt_decode(token);
      const { role } = decodedToken;

      setUserRole(role);
    }
  }, []);



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

              {userRole === 'admin' ?
                <Route path='/admin' element={<Admin />} />

                : <Route path='/' element={<Home />} />}


            </>
            :
            <>

              <Route path='/' element={<Home />} />

              <Route path='/login' element={<Login />} />
            </>
          }


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
