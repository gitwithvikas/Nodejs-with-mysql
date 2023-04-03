const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 8082
const server = express()

const userRouter = require('./router/User')
const bookRouter = require('./router/book')

server.use(express.json())


server.use('/api/user',userRouter)
server.use('/api/user',bookRouter)



server.get('/',(req,res)=>{
    res.send('Welcome to My Book Task Page')
})



server.listen(port ,()=>{
    console.log('Server listen on Port ' ,port)
})

