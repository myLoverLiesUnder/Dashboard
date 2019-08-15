const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    jobName: {
        type: String
    },
    jobType: {
        type: String
    }
});

module.exports = mongoose.model('Job',schema);
