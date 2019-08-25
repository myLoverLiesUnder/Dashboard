const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const JobType = require('../models/JobType');

//mock
const jobinfo = require('../data/jobInfo');
const buildinfo = require('../data/build');

/* GET dashboard Data. */
router.get('/', async (req, res) => {
    const jobTypes = await JobType.find();
    const data = [];
    for (let item of jobTypes) {
        let temp = {
            jobType: '',
            status: 'SUCCESS',
            jobList: [],
        };
        temp.jobType = item.typeName;
        let jobList = await Job.find({ jobType: item.typeName });
        for (let jobItem of jobList) {
            let job = {};
            job.jobName = jobItem.jobName;
            job.jobType = jobItem.jobType;
            job.lastBuild = jobinfo.lastBuild.number;
            job.lastCompletedBuild = jobinfo.lastCompletedBuild.number;
            //if job is running now
            if (job.lastBuild === job.lastCompletedBuild) {
                let testResult = buildinfo.actions.filter((item) => {
                    return item._class === 'hudson.tasks.junit.TestResultAction'
                });
                if(testResult.length > 0){
                    if (new Date(buildinfo.timestamp).toLocaleDateString() === new Date().toLocaleDateString()) {
                        job.failCount = testResult[0].failCount;
                        job.skipCount = testResult[0].skipCount;
                        job.totalCount = testResult[0].totalCount;
                        job.successCount = testResult[0].totalCount - testResult[0].skipCount - testResult[0].failCount;
                        job.successRatio = job.successCount / job.totalCount * 100 + '%';
                        job.timestamp = buildinfo.timestamp;
                        job.result = buildinfo.result;
                    } else {
                        job.failCount = testResult[0].totalCount;
                        job.totalCount = testResult[0].totalCount;
                        job.successCount = 0;
                        job.skipCount = 0;
                        job.successRatio = '0%';
                        job.result = 'FAIL';
                    }
                }else {
                    job.totalCount = jobinfo.lastSuccessfulBuild.number;
                    job.successCount = 0;
                    job.skipCount = 0;
                    job.failCount = job.totalCount;
                    job.successRatio = '0%';
                    job.result = 'FAIL';
                }
                // if (buildinfo.result === 'SUCCESS') {
                //     //if job is running today
                //     if (new Date(buildinfo.timestamp).toLocaleDateString() === new Date().toLocaleDateString()) {
                //         job.failCount = testResult[0].failCount;
                //         job.skipCount = testResult[0].skipCount;
                //         job.totalCount = testResult[0].totalCount;
                //         job.successCount = testResult[0].totalCount - testResult[0].skipCount - testResult[0].failCount;
                //         job.successRatio = job.successCount / job.totalCount * 100 + '%';
                //         job.timestamp = buildinfo.timestamp;
                //         job.result = buildinfo.result;
                //     } else {
                //         job.failCount = testResult[0].totalCount;
                //         job.totalCount = testResult[0].totalCount;
                //         job.skipCount = 0;
                //         job.successCount = 0;
                //         job.successRatio = '0%';
                //         job.result = 'FAIL';
                //     }
                // } else {
                //     if (testResult.length > 0) {
                //         if (new Date(buildinfo.timestamp).toLocaleDateString() === new Date().toLocaleDateString()) {
                //             job.failCount = testResult[0].failCount;
                //             job.skipCount = testResult[0].skipCount;
                //             job.totalCount = testResult[0].totalCount;
                //             job.successCount = testResult[0].totalCount - testResult[0].skipCount - testResult[0].failCount;
                //             job.successRatio = job.successCount / job.totalCount * 100 + '%';
                //             job.timestamp = buildinfo.timestamp;
                //             job.result = buildinfo.result;
                //         } else {
                //             job.failCount = testResult[0].totalCount;
                //             job.totalCount = testResult[0].totalCount;
                //             job.successCount = 0;
                //             job.skipCount = 0;
                //             job.successRatio = '0%';
                //             job.result = 'FAIL';
                //         }
                //     } else {
                //         job.totalCount = jobinfo.lastSuccessfulBuild.number;
                //         job.successCount = 0;
                //         job.skipCount = 0;
                //         job.failCount = job.totalCount;
                //         job.successRatio = '0%';
                //         job.result = 'FAIL';
                //     }
                //
                // }
            }
            if (job.result !== 'SUCCESS') {
                temp.status = 'FAIL'
            }
            temp.jobList.push(job)
        }
        data.push(temp);
    }
    res.send(data)
});

module.exports = router;
