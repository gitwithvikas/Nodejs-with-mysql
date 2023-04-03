const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

const Db = require('../DataBase/DBconnection')

// const User = require('../models/mySchema/user')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({ status: false, msg: 'You Must have logged In!' })
    }
    jwt.verify(token, process.env.TOKEN, (err, payload) => {
        if (err) {
            return res.status(401).json({ status: false, msg: 'You Must have logged In!' })
        }  
        const id  = payload.user
        console.log(id)

        Db.query('select * from users where id = ?',[id],(err,usr)=>{
            req.loggedUser = usr[0]
            next()
        })
        

      
            

    })

}