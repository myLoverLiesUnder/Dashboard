const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    jobName: {
        type: String
    },
    jobType: {
        type: String
    },
    lastBuild: {
        type: Number
    },
    totalCount: {
        type: Number
    },
    failCount: {
        type: Number
    },
    successCount: {
        type: Number
    },
    skipCount: {
        type: Number
    },
    timestamp: {
        type: Number
    },
    result: {
        type: String
    },
    successRatio:{
        type: String
    }
});

module.exports = mongoose.model('Job',schema);
