import app from './app.js'
import mongoose from 'mongoose';
const DBUrl = "mongodb+srv://Diwmix:cRK1TqdoRl1IJUsZ@aggregator.conqg6j.mongodb.net/Agreggator?retryWrites=true&w=majority&appName=Aggregator";

async function start() {
    try {
      await mongoose.connect(DBUrl);
      console.log("BD was started successfully")
  
      app.listen(3000, () => {
        console.log("Server running. Use our API on port: 3000")
      })
    } catch (error) {
      console.log(error);
    }
  }


start();