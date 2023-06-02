import styled from 'styled-components';

export const Container = styled.div`
display : flex;
flex-direction :column;
align-items:center;
justify-content:center; 
height:calc(100vh - 80px);
margin : 10px 10px;

`
export const LeftBar = styled.div`
display : flex;
align-items:center;
justify-content:center; 
padding : 5px 20px; 
background-color : #afb4b44b;
border-radius : 10px;

li{
    list-style : none;

    background-color : #013b42;
    background-color : #013b40;
    border-radius : 25px;
    color:white;

    margin : 10px 15px;
    padding : 11px 20px;
    cursor :pointer;
 
    letter-spacing :1.5px;
    &:hover{
     transform : scale(1.05,1.05);
    transition : 0.8s ease-in-out  transform;
    }


}

`
export const ContentBox = styled.div`
 
 display : flex;
align-items:center;
justify-content:center; 
background-color : #afb4b44b;
margin:25px 5px;
border-radius : 10px;
padding: 20px 10px;



`
export const SearchBox = styled.div`
margin : 10px 10px;
padding : 10px 10px;

input{
    min-height :35px;
    min-width : 200px;
   margin : 10px 10px;
   padding:2px 10px;
   border-radius : 7px;
   border:none;
   outline : none;
   font-size :20px;
   
}

`

export const NewCaseBox = styled.div`
display : flex;
align-items : center;
justify-content : flex-start;
flex-direction : column;
 


`

export const HorizontalFlex = styled.div`
  
display : flex;
align-items : center;
justify-content : center;


`


export const AddDetailsBox = styled.div`
display : flex;
align-items : center;
justify-content : center;
margin : 10px 10px;
 
 

input{
    background-color : #afb4b44b;
    outline :none;
    border : none;
    border-right : 6px solid #013b40;
    border-bottom : 6px solid #013b40;
    border-radius : 10px;
    min-height :35px;
    min-width : 275px;
    font-size :18px;
     padding: 3px 6px;
     color: WHITE;
 
    letter-spacing: 2px;
    &::placeholder {
        color:  #d2ebeb;  
      }
      margin: 10px 10px;    
      font-weight: bold;
      letter-spacing:1.5px;
      font-family: 'Geologica', sans-serif;


}

textarea{ 
    padding:10px 20px;
    font-size:19px;
    margin : 10px 10px;
    background-color : #afb4b44b;
    outline :none;
    border : none;
    border-right : 6px solid #013b40;
    border-bottom : 6px solid #013b40;
    border-radius : 10px;
     color:white ;
     font-family: 'Geologica', sans-serif;
     font-weight: bold;
     letter-spacing:1.5px;
     resize:none;
     line-height:35px;

     &: :placeholder {
     color:white; 
    }

}


input[type="file"] {
height:10px;
width:10px;
padding  : 10px 10px;
border : none;
}


input[type="file"]::-webkit-file-upload-button {

    background-color:#013b40;
    border-radius : 10px;
    border:none;
padding : 5px 10px;
color : white;

}


`


export const CasesBox = styled.div`
padding: 10px 10px;
border-radius :10px;
height: 430px;
overflow: auto;

font-family: 'Montserrat', sans-serif;
table {
  border-collapse: collapse;

}

th, td {
    text-align: left;
    padding : 30px;
    background-color :#2e3a48;
    color: white;
 }

th{
    background-color :#1c242c;
    position: sticky;
    top: -10px;
    left: 0px;
    right: 0px;
 }

 ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background:#afb4b44b;
    
  }

  ::-webkit-scrollbar-thumb {
    background:#2e3a48;
    border-radius: 4px;

}

  ::-webkit-scrollbar-thumb:hover {
    background:#1c242c;
  }


`


export const SingleCaseBox = styled.div`
margin : 50px 50px;
background-color: #afb4b44b;
border-radius: 10px;



`