const { Router } = require('express');
const router = Router();
const userService = require('./user.service')
const jwt = require("jsonwebtoken");
const { getUserByLogin, verifyUser, createUser, changeUserPlan } = require('./user.service');
const planModel = require('../plan/plan.model')
require('dotenv').config()

const secret = process.env.JWT_SECRET;

router.post(
    '/login',
    async (req, res) => {
        const { login, password } = req.body;
        const user = await getUserByLogin(login);
        if(!user){
            res.json({message: 'Пользователь не существует'});
            return
        }
        const isCompare = await verifyUser(password, user.password);
        console.log('Compare', isCompare)
        if(!isCompare){
            res.json({message: 'Не верный пароль'})
        }else{
            const jwtToken = jwt.sign(login,process.env.JWT_SECRET);
            const plan  = await planModel.findOne({_id: user.plan});
            res.json({token: jwtToken, user, plan})
        }
    }
)

router.post('/auth',async (req, res) => {
    try {
        const { token } = req.body;
        console.log(token)
        const verifiedLogin = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifiedLogin)
        const user = await getUserByLogin(verifiedLogin);
        const plan  = await planModel.findOne({_id: user.plan});

        res.json({user, plan})
    }catch(e){
        return null
    }
})

router.post('/registration',async (req, res) => {
    try {
        const { login, password } = req.body;

        const candidate = await getUserByLogin(login);
        if(candidate){
            res.json({message: 'Пользователь уже существует'})
        }else{
            const user = await createUser(login, password)
            const jwtToken = jwt.sign(login,process.env.JWT_SECRET);
            const plan  = await planModel.findOne({_id: user.plan});

            res.json({token: jwtToken, user, plan})
        }


    }catch (error){
        console.log(error)
        res.send(null)
    }
})

router.post('/change-plan',async (req, res) => {
    const {id, planType} = req.body;
    await changeUserPlan(id,planType);
    res.json({message: 'changed'})
})



module.exports = router;