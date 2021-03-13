var express = require('express');
var router = express.Router();
const Joi = require('joi'); 
const bcrypt = require('bcrypt');
const User = require('../model/user');
const utils = require('../utils');




const saltRounds = 10;

const schemas ={register:Joi.object().keys({ 
    name: Joi.string()  .required().label("name is required"),
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
  
      //console.log("error", details); 
     res.status(422).send({ error: message }) ;
  } 
    } 
  } 


  

router.post('/',middleware(schemas.register) ,async  (req, res )=>  {
 
    // First Validate The Request
    // Check if this user already exisits
    try {
  
      let user = await User.findOne({ email: req.body.email });
      
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {  
        // Insert the new user if they do not exist yet
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        //for password check
        //bcrypt.compareSync(myPlaintextPassword, hash); 
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
       await user.save()
   .then(item => {
    const token = utils.generateToken(user);
   res.status(200).send({message:"Item saved to database",token:token});
   })
   .catch(err => {
     console.log(err);
   res.status(400).send("unable to save to database");
   });
    }
    } catch (error) {
      console.log("error");
    }
    
  });

module.exports = router;