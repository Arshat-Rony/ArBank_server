
const { json } = require("body-parser");
const { serverError } = require("../errors/loginerror");
const Loans = require("../models/LoansModel");
const User = require("../models/User");

module.exports = {
    sendLoans(req, res) {
        const { loanamount, name, email, address, gender, loantype, phone, purpose, annualincome } = req.body;
        const user = req.user;


        const loans = new Loans({
            loanamount, name, email, address, gender, loantype, phone, purpose, annualincome,
            author: user._id,
        })
        loans.save()
            .then(newloan => {
                let updateUser = { ...req.user._doc }
                updateUser.loans.unshift(updateUser._id)

                User.findByIdAndUpdate(user._id, { $set: updateUser }, { new: true })
                    .then(loan => {
                        return res.status(201).json({
                            message: "Loans Applied Successfully",
                            newloan
                        })
                    })
                    .catch(err => serverError(res, err))
            })
            .catch(err => serverError(res, err))
    },
    getUserLoans(req, res) {
        const userId = req.user._id
        const { email } = req.body;

        Loans.find({ author: userId })
            .then(loans => {
                if (loans.length === 0) {
                    return res.status(201).json({
                        message: "You Have no Loans"
                    })
                }
                if (loans.length > 0) {
                    return res.status(201).json({
                        loans
                    })
                }
            })
            .catch(err => serverError(res, err))
    },
    getUserAllLoans(req, res) {
        Loans.find()
            .then(loans => {
                if (loans.length === 0) {
                    return res.status(201).json({
                        message: "You Have no Loans"
                    })
                }
                if (loans.length > 0) {
                    return res.status(201).json({
                        loans
                    })
                }
            })
            .catch(err => serverError(res, err))
    },

    removeLoan(req, res) {
        const { loanid } = req.params;

        Loans.findByIdAndDelete(loanid)
            .then(loan => {

                return res.status(201).json({
                    message: "Deletion Successfull",
                    loan
                })
            }
            )

            .catch(err => serverError(res, err))
    }
}