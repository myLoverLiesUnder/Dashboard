const express = require('express');
const router = express.Router();

const Job = require('../models/Job');
const JobType = require('../models/JobType');

//mock
const jobinfo = require('../data/jobInfo');
const buildinfo = require('../data/build')

/* GET dashboard Data. */
router.get('/', async (req, res) => {
    const jobTypes = await JobType.find();
    const data = [];
    for (const item of jobTypes) {
        let temp = {
            jobType: '',
            jobList: [],
        };
        temp.jobType = item.typeName;
        temp.jobList = await Job.find({ jobType: item.typeName });
        for (const jobItem of temp.jobList) {
            jobItem.lastBuild = jobinfo.lastBuild.number;
            let testResult = buildinfo.actions.filter((item) => {
                return item._class === 'hudson.tasks.junit.TestResultAction'
            });
            jobItem.failCount = testResult[0].failCount;
            jobItem.skipCount = testResult[0].skipCount;
            jobItem.totalCount = testResult[0].totalCount;
            jobItem.successCount = testResult[0].totalCount - testResult[0].skipCount - testResult[0].failCount;
            jobItem.successRatio = jobItem.successCount / jobItem.totalCount * 100 + '%';
            jobItem.timestamp = buildinfo.timestamp;
            jobItem.result = buildinfo.result;

        }
        data.push(temp);
    }
    res.send(data)
});


module.exports = router;
