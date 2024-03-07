const express=require('express')
const authRouter=require('./routes/auth.routes.js')
const cors=require('cors')
const {db}=require('./config/database.js')
require('dotenv').config()
const app=express()
const cookieParser=require('cookie-parser')
const PORT=process.env.PORT
app.use(cors())
db()
app.use(express.json({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/v1',authRouter);
app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})