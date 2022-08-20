const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionModel = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: String,
    email: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })



const Transaction = mongoose.model('Transaction', TransactionModel)

module.exports = Transaction;
