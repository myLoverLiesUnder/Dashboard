const express = require('express');
const router = express.Router();
const JobType = require('../models/JobType');
const Job = require('../models/Job');

//mock
const jobinfo = require('../data/jobInfo');
const buildinfo = require('../data/build');

/* GET dashboard Data. */
router.get('/', async (req, res) => {
    const jobTypes = await JobType.find();
    res.send(jobTypes)
});

module.exports = router;
