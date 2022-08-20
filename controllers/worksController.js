const { resourceError } = require("../errors/loginerror")
const Works = require("../models/WorkesModel")


module.exports = {
    getAllWorks(req, res) {
        Works.find()
            .then(works => {
                if (works.length > 0) {
                    return res.status(201).json({
                        message: "Data got successfully",
                        works: works,
                    })
                }
            })
            .catch(err => resourceError(res, err))
    }
}