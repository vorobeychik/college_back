const axios = require("axios");
const userModel = require('./user.model');
const bcrypt = require('bcrypt');
const { getPlan } = require('../plan/plan.service')

class UserService {
    async getUserByLogin(login) {
        return userModel.findOne({login});
    }

    async createUser(login, password) {
        const plan = await getPlan('Basic');
        console.log(plan)
        const hashedPassword = await bcrypt.hash(password, 10);
        return userModel.create({login, password: hashedPassword, plan: plan._id})
    }

    async changeUserPlan(userId,planType){
        const plan =  await getPlan(planType);
        const updatedUser = await userModel.updateOne({_id:userId}, {plan: plan._id})
    }

    async verifyUser(password, passwordFromDb) {
        return await bcrypt.compare(password, passwordFromDb)
    }
}



module.exports = new UserService()