import React from 'react';
import { Link } from 'react-router-dom';
import { TopNavbar, Logo, MenuOptions, MenuItem } from '../../Styles/HomeStyles';
import '../../../App.css';

const TopNav = () => {
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

                    <Link to='/about' >
                        <MenuItem>
                            <li>About </li>

                        </MenuItem>
                    </Link>
                    <Link to='/about' >
                        <MenuItem>
                            <li>Contact </li>

                        </MenuItem>
                    </Link>

                    <Link to='/login' >

                        <div className='login_bt'>
                            <h3>Login</h3>


                        </div>


                    </Link>



                </MenuOptions>





            </TopNavbar>

        </div>
    )
}

export default TopNav