const express = require('express');
const router = express.Router();

const JobType = require('../models/JobType');
/* GET dashboard Data. */
router.get('/', async (req, res) => {
    res.send(await JobType.find())
});

module.exports = router;
