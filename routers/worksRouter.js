
const router = require('express').Router()
const { getAllWorks } = require('../controllers/worksController')

// get all works from database
router.get("/works", getAllWorks)

module.exports = router;