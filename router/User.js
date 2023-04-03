const express = require('express')
const Db = require('../DataBase/DBconnection')
const bcrypt = require('bcrypt')
const salt = 10
const router = express.Router()
const jwt = require('../JWT/JWT')



router.post('/signUp',(req,res)=>{
    const data = req.body

    if(data.name==null || data.password==null || data.email==null){
        return res.status(500).json({msg:'Please fillout all Fields'})
    }else{
         bcrypt.genSalt(salt, (err, salt)=> {
        bcrypt.hash(data.password, salt,(err, hash)=> {
           Db.query('insert into users (userName,email,password) value(?,?,?) ',[data.userName,data.email,hash],(err,result)=>{
        if(err){
            return res.json({status:false,msg:'User Registration Failed'})
        }
        else{
            return res.status(200).json({msg : 'User Registration Successfull'})
        }
    }) 

        });
    });

    }
    
   

    
    
})


router.post("/signIn",(req,res)=>{

    const data = req.body
   
    Db.query('select * from users WHERE email = ?' , [data.email],(err ,user)=>{
        if(err || user.length == 0){
            return res.status(600).json({status:false,msg:'Invalid Credentials !'})
        }
        else{
                
            bcrypt.compare(data.password,user[0].password,(err,usr)=>{
                if(err){
                 return res.status(600).json({status:false,msg:'Invalid Credentials !'})
                }
            
                    console.log(usr)
                    if(usr){
                        console.log(user)
                        const token = jwt.generateAccessToken(user[0].id)

                        res.status(200).json({status:true,msg:'User Login Successfull...',user,token:token})
                    }else{
                     return res.status(600).json({status:false,msg:'Invalid Credentials !'})

                    }

                
            })

        }
    })


})


router.put('/changepsw',(req,res)=>{
    const data = req.body
    console.log(data)


    Db.query('select * from users WHERE id = ?' , [data.id],(err ,user)=>{

        if(err){
          return res.status(600).json({status:false,msg:"You Can't Change Password "})
        }
        else{

            bcrypt.compare(data.oldpassword,user[0].password,(err,usr)=>{
                if(err){
                 return res.status(600).json({status:false,msg:'Invalid Password !'})
                }
            
                   
                    if(usr){
                        console.log(user)

                        bcrypt.genSalt(salt,(err,salt)=>{
                            bcrypt.hash(data.newpassword,salt,(err,hash)=>{
                                console.log(hash)
                                
                                Db.query('UPDATE users SET password = ? where id = ?',[hash,data.id],(err,updatUser)=>{
                                    if(err){
                                        return res.json({status:false,msg:'Password Updation Failed',err})
                                    }
                                    else{
                                        return res.status(200).json({msg : 'User Password Successfull Update'})
                                    }
                                })
                                
                            })
                        })

                    }else{
                     return res.status(600).json({status:false,msg:'Invalid Password !'})

                    }

                
            })

            
        }

    })



})


















module.exports = router;
