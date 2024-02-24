import app from './app.js'
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv()

async function start() {
    try {
      await mongoose.connect(process.env.DBURL);
      console.log("BD was started successfully")
  
      app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running. Use our API on port: ${process.env.PORT}`)
      })
    } catch (error) {
      console.log(error);
    }
  }


start();