const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagemodel = new Schema({
    name: String,
    email: String,
    message: String,
})


const Message = mongoose.model('message', messagemodel)

module.exports = Message;