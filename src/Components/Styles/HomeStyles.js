import styled from 'styled-components';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
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
        dismissible: true,
      },
      {
        type: 'info',
        background: '#00adf1',
        duration: 5000,
        dismissible: true,
      },
    ],
  });

export const TopNavbar = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
padding: 0px 10px;
a{
    text-decoration: none;
}
 
 
`
export const MenuItem = styled.div`
display: flex;
align-items: center;
justify-content: center;
li{
    font-family: 'Poppins', sans-serif;
        list-style-type: none;
        font-size : 16px;
        font-weight: 580;
        letter-spacing:1.5px;
}
 padding: 10px 15px;
border-radius  :5px;
&:hover{
    border-bottom : 5px solid  #003439 ;
 }
 
 margin : 0px 10px;
`
export const MenuOptions = styled.div`
 display: flex;
align-items: center;
padding: 10px 10px;
align-items: center;
a{
    color: white;
    font-size:15px;
    text-decoration: none;  

  
}
 
`
export const Logo = styled.div`
display: flex;
align-items: center;
justify-content:center;
padding: 10px 10px;
img{
height: 50px;
width: 50px; 
}
h3{
    font-size:30px;
    color: white;
    letter-spacing:3px;
    
    
}
 
`
export const HomeContainer = styled.div`
display: flex;
align-items: center;
height:calc(100vh - 80px);
 img{
    margin-top: 50px;
    height: 70vh;
    width: 50vw;
 }

 
`
export const WelcomeBox = styled.div`
display: flex;
padding: 5px 20px;
margin-right: 30px;
flex-direction : column;
max-width : 750px;

h1{
    color: #002b2f;
    margin-bottom: 30px;
    font-size:50px;
    
}
p{
    text-align: justify;
    font-size:18px;
    color: #e3f8fa;
    font-family: 'Montserrat', sans-serif;
    line-height: 29px;
    font-weight: 550;
}
 

`
export const LoginBox = styled.div`
 
flex-direction : column;
margin-right: 30px;
padding: 30px 30px;

`
export const FormItem = styled.div`
margin : 20px 5px;
input{
    background-color : #afb4b44b;
    outline :none;
    border : none;
    border-right : 6px solid #013b40;
    border-bottom : 6px solid #013b40;
    border-radius : 10px;
    height : 35px;
    font-size :20px;
    width : 300px;
    padding: 3px 6px;
    color: #d2ebeb;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 2px;
    &::placeholder {
        color:  #d2ebeb;  
      }

}

 


h2{
    color: white;
    font-size:40px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 2px;
}


`

export const SignUpBox =styled.div`


`
export const FormItemPar =styled.div`

display:flex;
 

`