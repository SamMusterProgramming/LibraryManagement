const express = require('express')
const cors = require('cors')
const connectDB = require('./db.js')
const bookRoute = require('./routes/bookRoute.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT; 
connectDB();

app.use(express.json())  
app.use(cors())
app.use('/books', bookRoute)


app.listen(PORT,()=>{ 
    console.log("listenning on port "+PORT)
})
  