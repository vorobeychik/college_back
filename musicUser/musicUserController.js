const { Router } = require('express')
const userService = require('./musicUserService')
const jwt = require("jsonwebtoken");
const router = Router();
const { getUserByLogin, verifyUser, createUser } = require('./musicUserService')
require('dotenv').config()

const secret = process.env.JWT_SECRET;

router.post(
    '/login',
    async (req, res) => {
        const { login, password } = req.body;
        const user = await getUserByLogin(login);
        const isCompare = await verifyUser(password, user.password);
        if(!isCompare){
            res.json({message: 'Не верный пороль'})
        }
        const jwtToken = jwt.sign(login,process.env.JWT_SECRET);
        res.json({token: jwtToken, user})

    }
)

router.post('/auth',async (req, res) => {
    try {
        const { token } = req.body;
        console.log(token)
        const verifiedLogin = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifiedLogin)
        const user = await getUserByLogin(verifiedLogin);

        res.json(user)
    }catch(e){
        return null
    }
})

router.post('/registration',async (req, res) => {
    try {
        const { login, password } = req.body;

        const candidate = await getUserByLogin(login);
        if(candidate){
            res.json({message: 'Пользователь же существует'})
        }else{
            const user = await createUser(login, password)
            const jwtToken = jwt.sign(login,process.env.JWT_SECRET);

            res.json({token: jwtToken, user})
        }


    }catch (error){
        console.log(error)
        res.send(null)
    }

})

module.exports = router;