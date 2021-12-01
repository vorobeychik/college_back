const axios = require("axios");
const musicUserModel = require('./musicUserModel');
const bcrypt = require('bcrypt')

class UserService {
    async getUserByLogin(login) {
        return musicUserModel.findOne({login});
    }

    async createUser(login, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return musicUserModel.create({login, password: hashedPassword, avatar: 'avatar'})
    }

    async changeAvatar(userId,avatarName){
        return musicUserModel.updateOne({_id: userId}, { avatar: avatarName})
    }

    async verifyUser(password, passwordFromDb) {
        return await bcrypt.compare(password, passwordFromDb)
    }
}



module.exports = new UserService()