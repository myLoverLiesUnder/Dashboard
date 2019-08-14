const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
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
            status: 'SUCCESS',
            jobList: [],
        };
        temp.jobType = item.typeName;
        let today = new Date();
        let yesterday = new Date(Date.now() - 86400000);
        temp.jobList = await Job.find({ jobType: item.typeName, timestamp: { $gte: yesterday, $lt: today } });
        for (let jobItem of temp.jobList) {
            if (jobItem.result !== 'SUCCESS') {
                temp.status = 'FAIL'
            }
        }
        data.push(temp);
    }
    res.send(data)
});

/* Cron job
   save data to job models
*/

const dailySaveToJobModel = () => {
    schedule.scheduleJob('30 1 1 * * *', async () => {
        let today = new Date();
        let yesterday = new Date(Date.now() - 86400000);
        const jobList = await Job.find({ timestamp: { $gte: yesterday, $lt: today } });
        for (let job of jobList) {
            let model = {};
            model.jobName = job.jobName;
            model.jobType = job.jobType;
            model.lastBuild = jobinfo.lastBuild.number;
            let testResult = buildinfo.actions.filter((item) => {
                return item._class === 'hudson.tasks.junit.TestResultAction'
            });
            model.failCount = testResult[0].failCount;
            model.skipCount = testResult[0].skipCount;
            model.totalCount = testResult[0].totalCount;
            model.successCount = testResult[0].totalCount - testResult[0].skipCount - testResult[0].failCount;
            model.successRatio = model.successCount / model.totalCount * 100 + '%';
            model.timestamp = new Date();
            model.result = buildinfo.result;
            console.log(123)
            Job.create(model);
        }
    })
};

dailySaveToJobModel();


module.exports = router;
