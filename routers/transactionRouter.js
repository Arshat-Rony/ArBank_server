const router = require("express").Router()
const { createTransaction, getAlltransaction, getSingleTransaction, removeTransaction, updateTransaction } = require("../controllers/transactionControllers")

const authenticate = require("../authenticate")


// get all trasaction 
router.get('/transactions/:email', authenticate, getAlltransaction)


// store a single transaction 
router.post('/transactions', authenticate, createTransaction)


// get a single transaction 
router.get('/transactions/:transactionID', getSingleTransaction)


// update a single transaction 
router.put('/transactions/:transactionID', authenticate, updateTransaction)


// delete a single transaction 
router.delete('/transactions/:transactionID', removeTransaction)


module.exports = router;