require('dotenv').config();


const devOrigin = 'http://localhost:3000';
const uri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.bh7e5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


module.exports = { uri, devOrigin }