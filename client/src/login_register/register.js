import React from 'react';
import axios from 'axios';

export default function Register() {
    const [person, setData] = React.useState({
        name: '',
        email: '',
        password: ''});
      
        async function submit(e){
         e. preventDefault();
      
          let { name, email, password } = person;
      
          const data1 = {
            name,
            email,
            password
            
          };
          try {
            //NO NEED DUE TO UPDATE
            // const config = {
            //   headers: {
            //     "Content-Type": "application/json",
            //   }
            // };
             await axios.post("/signup",data1).then(
              item  => { 
                console.log(item);
                alert("successfully register");}
                
            ).catch(  err =>{
             if(err.response.data.error){
               alert(err.response.data.error);
             }
             else{
               alert(err.response.data);
             }
              // if(err.response.data.message!=''){
              //  // alert(err.response.data.message);
              // }
              // else{
              //   //alert(err.response.data.error);
              // }
            });
          }
          catch(error) {
            console.log(error);
          }
          document.getElementById("fields").value = "";
          document.getElementById("fields1").value = "";
          document.getElementById("fields2").value = "";
          
          
        }
        const changeHandler = e => {
          setData({...person, [e.target.name]: e.target.value});
       }
    return (
        <form onSubmit={submit}>
            <h1> Register user</h1><br /><br />
    <div>
      Name<br />
      <input type="text"  id="fields" className="form-control"
       name="name"
       placeholder="Name"
       onChange={changeHandler}  required/>
    </div>
    <div>
      Email<br />
      <input type="email" id="fields1"  className="form-control"
       name="email"
       placeholder="Enter a valid email id"
       onChange={changeHandler} required/>
    </div>
    <div style={{ marginTop: 10 }}>
      Password<br />
      <input type="password" id="fields2"  className="form-control"
       name="password"
       placeholder="password with minimun length 6"
       onChange={changeHandler} required />
    </div>
    <button  className="button" type="submit">signup</button>
        </form>
    )
}
