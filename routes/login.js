const express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const utils = require('../utils');
const Joi = require('joi'); 


const schemas ={login_data:Joi.object().keys({ 
  email:Joi.string()  .required() .email().label("please fill a valid email"),
  password: Joi.string() .min(6) .required().label("check your password")
})}; 

const middleware = (schema) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req.body); 
  const valid = error == null; 

  if (valid) { 
    next();   
  } else { 
    const { details } = error; 
     const message = details.map(i => i.message).join(',');

   res.status(401).send({ error: message }) ;
} 
  } 
} 


router.post('/',middleware(schemas.login_data),async (req,res)=>{

    const {email,password}=req.body;
    try {
     data= await User.findOne({'email':email});
   


     if(!data){
       return res.status(401).send({message:"user not found"});
     }
     else{
        if(bcrypt.compareSync(password, data.password))
        {
          res.status(200).send("successfully logged in ");
        }
        else{
          res.status(400).send({message:"wrong password"});
        }
       
     }
    } catch (error) {
      console.log(error);
    }
    
   
   
   });

   module.exports=router;

