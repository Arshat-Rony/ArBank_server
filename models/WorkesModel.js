const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const worksModel = new Schema({
    name: String,
    text: String,
    picture: String,
})


const Works = mongoose.model('Works', worksModel)

module.exports = Works;