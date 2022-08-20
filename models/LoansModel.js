const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LoansSchema = new Schema({
    loanamount: Number,
    name: String,
    email: String,
    address: String,
    phone: Number,
    purpose: String,
    annualincome: Number,
    gender: String,
    loantype: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Loans = mongoose.model('Loans', LoansSchema);

module.exports = Loans;