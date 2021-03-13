require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser') 
const jwt = require('jsonwebtoken');
const connectDB=require('./db');


var login=require('./routes/login.js');
var register=require('./routes/register.js');



 
const app = express();

const port = process.env.PORT || 4000;
connectDB();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false })) ;
app.use(bodyparser.json()) ;

 app.use('/login',login);
 app.use('/signup',register);
app.use(function (req, res, next) {
 
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue
  
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});
 




// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});