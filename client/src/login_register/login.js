import React from 'react';
import axios from 'axios';
import './login.css';

export default function Login() {
    const [data, setData] = React.useState({
        email: '',
        password: ''});

        // function handleSubmitted ( )  {
        //  setData({email:'',password:''});
        // }
        async function submit(e){
         e. preventDefault();
      console.log(e);
          let { email, password } = data;
      
          const data1 = {
            email,
            password
            
          };

          //  handleSubmitted();
          try {
            // const config = {
            //   headers: {
            //      "Content-Type": "application/json",
            //    }};
             await axios.post("/login",data1).then(
               item  => {
                
                alert("successfully login");

                }).catch(  err =>{
              
              if(err.response.data.message!=''){
                alert(err.response.data.message);
              }
              else{
                alert(err.response.data.error);
              }
             });
          }
          catch(error) {
            console.log(error);
          }
          document.getElementById("fields").value = "";
          document.getElementById("fields1").value = "";
          
        }
        const changeHandler = e => {
          setData({...data, [e.target.name]: e.target.value});
       }

       
    return (
        <form className="formdata" onSubmit={submit}>
           <h1> Login Page</h1><br /><br />
    <div>
      email
      <input type="email" id="fields" className="form-control"
       name="email"
       placeholder="email"
       onChange={changeHandler} required="required"/>
    </div>
    <div style={{ marginTop: 10 }}>
      Password
      <input type="password" id="fields1" className="form-control"
       name="password"
       placeholder="password"
       onChange={changeHandler} required="required" />
    </div>
    <button  className="button" type="submit" >Login</button>
        </form>
    )
}
