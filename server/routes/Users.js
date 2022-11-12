const { response, application } = require('express')
const express = require('express')
const router = express.Router()

// pwd crypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//auth
const { sign } = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddleware')
const { Users, Sequelize } = require('../models');
const e = require('express');


//  login code

router.post('/login', async (req, res) => {
    let user = req.body

    if(!user.pwd) {
        res.json({error: "Fill the password field."})
    }

    const toFindUser = await Users.findOne({ where: {email: user.email} })

    if (!toFindUser) {
        console.log("User doesn't exist.")
        res.json({error: "User doesn't exist."})
    } else {
        bcrypt.compare(user.pwd, toFindUser.pwd).then((match) => {
            if (!match) {
                console.log("Wrong username and password combination.")
                res.json({error: "Wrong username and password combination."})
            }

                const accessToken = sign({ 
                    email: toFindUser.email, 
                    id: toFindUser.id 
                }, "secret-token-value")

                //if success then...
                res.json(accessToken)
        })
    }

})

router.get('/check', validateToken, (req, res) => {
    res.json(req.toFindUser)
})



// signup code

router.post("/signup", async (req, res) => {

    let user = req.body;
    
    bcrypt.hash(user.pwd, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        } else{
                Users.create({
                    email: user.email,
                    pwd: hash
                })
        }
    });

    
    res.json(user)
})

module.exports = router