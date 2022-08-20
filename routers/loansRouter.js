const router = require('express').Router()
const authenticate = require('../authenticate');
const { sendLoans, getUserLoans, removeLoan, getUserAllLoans } = require('../controllers/loansController')


router.post('/loans', authenticate, sendLoans);

router.get('/getuserloans', authenticate, getUserLoans)

router.delete('/deleteLoans/:loanid', authenticate, removeLoan)

router.get('/alluserloans', authenticate, getUserAllLoans)


module.exports = router;