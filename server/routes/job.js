const express = require('express');
const router = express.Router();

const Job = require('../models/Job');

/* GET dashboard Data. */
router.get('/', async (req, res) => {
    res.send(await Job.find())
});



module.exports = router;
