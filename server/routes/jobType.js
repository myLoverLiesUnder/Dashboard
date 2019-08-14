const express = require('express');
const router = express.Router();
const jobInfo =  require('../data/jobInfo');

const JobType = require('../models/JobType');
/* GET dashboard Data. */
router.get('/', async (req, res) => {
    console.log(jobInfo.lastBuild.number)
    res.send(await JobType.find())
});

module.exports = router;
