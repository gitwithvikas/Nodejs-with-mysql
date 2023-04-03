const express = require('express')

const router = express.Router()
const authUser  = require('../JWT/auth')
const Db = require('../DataBase/DBconnection')

router.post('/addbook',authUser,(req,res)=>{
    const data = req.body

    console.log(data)

    if(data.bookName == null || data.authorName == null || data.isbn == null){
      return res.status(600).json({status:false,msg:'Fill All Fields'})
    }
    else{
        console.log(req.loggedUser.id)
       Db.query('insert into books (bookName ,authorName , ISBN , userId) values (?,?,?,?) ',[data.bookName,data.authorName,data.isbn,req.loggedUser.id],(err,books)=>{
        if(err){
            return res.status(400).json({status:false,msg:'Insert Error!',err})
        }
        else{
            return res.status(200).json({status:true,msg:"Books Saved Successfull"})
        }
       })
    }





})




router.get('/showbooks',authUser,(req,res)=>{
    const usrId = req.loggedUser.id

    Db.query('select * from books where userId = ?',[usrId],(err,books)=>{
        if(err){
            return res.status(400).json({msg:"Please Add Some Books"})
        }
        else{
            return res.status(200).json({status:true,books})
        }
    })
})








module.exports = router;