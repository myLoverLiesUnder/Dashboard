const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    jobName: {
        type: String
    },
    jobType: {
        type: String
    },
    lastSuccessfulBuild: {
        type: String
    },
    lastBuild: {
        type: String
    },
    lastCompletedBuild: {
        type: String
    }
});

module.exports = mongoose.model('Job',schema);
