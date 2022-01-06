
const mongoose  = require('mongoose');
const uri = ADD YOUR OWN URI GIVEN BY MONGO;
const connectDB = async()=>{
  try{
      await mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify:false,useCreateIndex:true});
      console.log("mongodb connected")

  }
  catch(err){
      console.error(err.message);
      //EXIT
      process.exit(1);
  }
};

module.exports= connectDB;
