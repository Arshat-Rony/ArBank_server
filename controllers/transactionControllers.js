const { serverError } = require("../errors/loginerror");
const User = require("../models/User");

const Transaction = require("../models/TransactionModel.js")

module.exports = {

    // creating a new transaction 
    createTransaction(req, res) {
        const { amount, type, email } = req.body;
        const user = req.user;

        let transaction = new Transaction({
            amount, type, email, author: user._id
        })

        // saving a single transaction 
        transaction.save()
            .then((trans) => {
                let updatedUser = { ...req.user._doc }

                if (type === "deposite") {
                    updatedUser.balance = parseInt(updatedUser.balance) + parseInt(amount);
                    updatedUser.income = parseInt(updatedUser.income) + parseInt(amount);
                } else if (type === "withdraw") {
                    updatedUser.balance = parseInt(updatedUser.balance) - parseInt(amount);
                    updatedUser.expense = parseInt(updatedUser.expense) + parseInt(amount)
                }
                updatedUser.transaction.unshift(updatedUser._id)

                // updating the user according to new info
                User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                    .then(transaction => {
                        return res.status(201).json({
                            message: "transaction created successfully",
                            transaction
                        })
                    })
                    .catch(err => serverError(res, err))
            })
            .catch(err => serverError(res, err))

    },


    // getting all tranasaction 
    getAlltransaction(req, res) {
        const { email } = req.params;
        const { _id } = req.user

        Transaction.find({ author: _id })
            .then((transactions) => {
                if (transactions.length === 0) {
                    return res.status(200).json({
                        message: "No transaction found"
                    })
                } else {
                    return res.status(200).json(transactions)
                }
            })
            .catch(err => serverError(res, err))
    },



    // getting a single transaction
    getSingleTransaction(req, res) {
        const { transactionID } = req.params;
        Transaction.findById(transactionID)
            .then((transaction) => {
                if (!transaction) {
                    return res.status(200).json({
                        message: "Transaction is not available"
                    })
                } else {
                    return res.status(200).json(transaction)
                }
            })
            .catch(err => serverError(res, err))
    },


    // getting a single transaction
    updateTransaction(req, res) {
        const { transactionID } = req.params;
        Transaction.findByIdAndUpdate(transactionID, { $set: req.body }, { new: true })
            .then((transaction) => {

                return res.status(200).json(transaction)
            })
            .catch(err => serverError(res, err))
    },


    // delete a transaction 
    removeTransaction(req, res) {
        const { transactionID } = req.params;
        Transaction.findByIdAndDelete(transactionID)
            .then(data => {
                return res.status(200).json({
                    message: "Deleted Successfully"
                })
            })
            .catch(err => serverError(res, err))
    }

}