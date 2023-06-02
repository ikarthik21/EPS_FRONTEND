import React, { useState } from 'react';
import '../../../App.css';
import { HomeContainer, LoginBox, SignUpBox, FormItemPar, FormItem } from '../../Styles/HomeStyles';
import { adduser, loginuser } from '../../Service/API';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'error',
            background: '#ef5644',
            duration: 5000,
            dismissible: true
        },
        {
            type: 'info',
            background: '#00adf1',
            duration: 5000,
            dismissible: true
        }

    ]
});

const Login = () => {

    const navigate = useNavigate();
    const user = {
        lemail: "",
        lpassword: ""
    }

    const Newuser = {
        name: "",
        ilnumber: "",
        mobile: "",
        email: "",
        password: "",
        cpassword: ""
    }


    // User Registration Details
    const [registerDetails, setregisterDetails] = useState(Newuser);

    // User Login Details 
    const [loginDetails, setloginDetails] = useState(user);

    // Signup and SignIn toggle 
    const [showSignUp, setshowSignUp] = useState(false);


    // Signup and SignIn toggle function 
    const handleBox = () => {
        return setshowSignUp(!showSignUp);
    }


    // Login details input reading function 

    const readLoginInput = (e) => {
        setloginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    }

    // Registration  details input reading function 
    const readRegisterInput = (e) => {
        setregisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
    }

    // Regisration handling function 

    const regUser = async () => {

        if (registerDetails.name && registerDetails.ilnumber && registerDetails.mobile && registerDetails.email && registerDetails.password &&
            registerDetails.cpassword) {
            if (registerDetails.password === registerDetails.cpassword) {

                try {
                    const response = await adduser(registerDetails);
                    console.log(response);
                    notyf.open({
                        type: 'info',
                        message: response.data.message
                    });

                }
                catch (err) {
                    console.log(err);
                    notyf.error("Error adding user", err);
                }
            }
            else {
                notyf.error('Both passwords must be same');
            }
        }
        else {
            notyf.error('Please fill all the fields');
        }
    }



    // Login  handling function 

    const handleLogin = async () => {

        if (loginDetails.lemail === "" || loginDetails.lpassword === "") {
            notyf.error('Please fill all the fields');
        }
        else {

            try {
                const response = await loginuser(loginDetails);

                const token = response.data.token;
                console.log(token);
                const expires = 1 / 24;
                Cookies.set('token', token, { expires: expires })



                navigate('/');
                window.location.reload();
                notyf.open({
                    type: 'info',
                    message: "Login successful"
                });
            }

            catch (err) {
                notyf.error("Error", err);
            }

        }

    }






    return (
        <HomeContainer>
            <img src="/images/home2.svg" alt="" className='main_img2' />



            {

                showSignUp ?
                    <SignUpBox>
                        <FormItem>
                            <h2>Register</h2>

                        </FormItem>

                        <FormItemPar>



                            <FormItem>
                                <input type="text" placeholder='Name'

                                    name='name'
                                    onChange={readRegisterInput} />

                            </FormItem>
                            <FormItem>
                                <input type="text" placeholder='IL Number'



                                    name='ilnumber'
                                    onChange={readRegisterInput}

                                />

                            </FormItem>


                        </FormItemPar>


                        <FormItemPar>


                            <FormItem>
                                <input type="text" placeholder='Mobile'

                                    name='mobile'
                                    onChange={readRegisterInput}

                                />

                            </FormItem>
                            <FormItem>

                                <input type="email" placeholder='email'


                                    name='email'

                                    onChange={readRegisterInput}

                                />

                            </FormItem>


                        </FormItemPar>


                        <FormItemPar>


                            <FormItem>

                                < input type="password" placeholder='password'


                                    name='password'

                                    onChange={readRegisterInput}

                                />
                            </FormItem>
                            <FormItem>

                                < input type="password" placeholder='confirm password'

                                    name='cpassword'
                                    onChange={readRegisterInput}


                                />
                            </FormItem>

                        </FormItemPar>

                        <div style={{ textAlign: 'center' }}>
                            <FormItem style={{ marginRight: '100px' }}>
                                <button className='login_bt' onClick={regUser} ><h3>Register</h3></button>

                            </FormItem>

                            <FormItem>
                                <button className='spl_link' onClick={handleBox}> Already a Member  ? LogIn</button>
                            </FormItem>


                        </div>



                    </SignUpBox>

                    :

                    <LoginBox className='Flexv2'>


                        <FormItem>
                            <h2>LogIn</h2>

                        </FormItem>

                        <FormItem>
                            <input type="email" placeholder='email' name='lemail' onChange={readLoginInput} />

                        </FormItem>

                        <FormItem>

                            < input type="password" placeholder='password' name='lpassword' onChange={readLoginInput} />
                        </FormItem>
                        <FormItem>
                            <button className='login_bt' onClick={handleLogin} ><h3>Login</h3></button>

                        </FormItem>
                        <FormItem >
                            <button className='spl_link' onClick={handleBox}> Not a member ? Sign Up</button>

                        </FormItem>

                    </LoginBox>
            }






        </HomeContainer>
    )
}

export default Login