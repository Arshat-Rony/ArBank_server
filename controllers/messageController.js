const { serverError } = require("../errors/loginerror");
const Message = require("../models/MessageModel");
const User = require("../models/User");


module.exports = {
    sendMessage(req, res) {
        const { name, message, email } = req.body;
        const user = req.user;
        const messages = new Message({
            name, message, email, author: user._id
        })

        messages.save()
            .then(mess => {

                let updatedUser = { ...req.user._doc }
                updatedUser.message = message;

                User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                    .then(data => {
                        if (data) {
                            return res.status(201).json({
                                message: "message sent successfully"
                            })
                        }
                    })
                    .catch(err => serverError(res, err))
            })
            .catch(err => serverError(res, err))
    }
}