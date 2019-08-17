const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const bodyParser = require('body-parser');
const History = require('../models/History');
const Job = require('../models/Job');

const jsonParser = bodyParser.json();

//mock
const jobinfo = require('../data/jobInfo');
const buildinfo = require('../data/build');

/* GET history Data. */
router.get('/', async (req, res) => {
    res.send(await History.find());
});

/* Create comment */
router.post('/comment', jsonParser, async (req, res) => {
    const model = await History.create(req.body);
    res.send(model)
});

/* PUT comment */
router.put('/comment/:id', jsonParser, async (req, res) => {
    const model = await History.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
});

/* Delete comment */
router.delete('/comment/:id', async (req, res) => {
    await History.findByIdAndDelete(req.params.id);
    res.send({
        success: true
    })
});

/*Cron job daily save*/
const dailySave = () => {
    schedule.scheduleJob('30 1 1 * * *', async () => {
        const jobList = await Job.find();
        let model = {
            date: new Date().toLocaleDateString(),
            comment: '',
            errorJobList: []
        };
        for (let jobItem of jobList) {
            let buildResult = buildinfo.result;
            if (buildResult !== 'SUCCESS') {
                model.errorJobList.push({ url: buildinfo.url });
            }
        }
        let data = await History.find({ date: model.date });
        if (data && data.ObjectId) {
            model.comment = data.comment;
            History.update(model, function (err, model) {
                if (err) console.log(err);
                console.log('Update Successfully' + model);
            })
        } else {
            History.create(model, function (err, model) {
                if (err) console.log(err);
                console.log('Create Successfully' + model)
            });
        }
    })
};

dailySave();

module.exports = router;
