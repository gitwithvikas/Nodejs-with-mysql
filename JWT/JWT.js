const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

class JWT {


    generateAccessToken(userId) {
        return jwt.sign({ user: userId }, process.env.TOKEN,
            { expiresIn: "5m" })

    }



}

module.exports = new JWT()