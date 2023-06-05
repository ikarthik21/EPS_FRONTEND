import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TopNavbar, Logo, MenuOptions, MenuItem } from '../../Styles/HomeStyles';
import '../../../App.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { dummy } from '../../Service/API';
import jwt_decode from 'jwt-decode';


const TopNav = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [isAdmin, setisAdmin] = useState('');

    useEffect(() => {

        if (token) {
            // Decode the JWT token to extract the user role
            const decodedToken = jwt_decode(token);
            const { role } = decodedToken;
            setisAdmin(role);
        }

    }, []);




    const ClearCookies = () => {

        Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName);
        });
        navigate('/');

        window.location.reload();
    };



    return (
        <div>

            <TopNavbar>

                <Link to='/' >
                    <Logo >
                        <img src="/images/logo.png" alt="" />
                        <div className='spl_line1' >

                        </div>
                        <div>
                            <h3>EPS</h3>
                        </div>

                    </Logo>
                </Link>
                <MenuOptions>


                    <Link to='/' >
                        <MenuItem>
                            <li>Home</li>

                        </MenuItem>
                    </Link>

                    <Link to='/dashboard' >
                        <MenuItem>
                            <li> Dashboard</li>

                        </MenuItem>
                    </Link>



                    {
                        isAdmin === 'admin' ? <Link to='/admin' >
                            <MenuItem>
                                <li>Admin </li>

                            </MenuItem>
                        </Link> : ""

                    }


                    {token ?
                        <div className='login_bt' onClick={ClearCookies}>
                            <h3>Logout</h3>
                        </div>


                        :

                        <Link to='/login' >



                            <div className='login_bt'>
                                <h3>Login </h3>
                            </div>


                        </Link>


                    }



                </MenuOptions>





            </TopNavbar>

        </div>
    )
}

export default TopNav