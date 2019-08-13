const express = require('express');
const router = express.Router();

const Job = require('../models/Job');
const JobType = require('../models/JobType');

/* GET dashboard Data. */
router.get('/', async (req, res) => {
    const jobTypes = await JobType.find();
    const data = [];
    for (const item of jobTypes) {
        let temp = {
            jobType: '',
            jobList: []
        };
        temp.jobType = item.typeName;
        temp.jobList = await Job.find({ jobType: item.typeName });
        data.push(temp);
    }
    res.send(data)
});


module.exports = router;
