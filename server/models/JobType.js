const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    typeName: {
        type: String
    },
    status: {
        type: String
    },
    timestamp: {
        type: Number
    },
    errorJobList:[{
        type: String
    }]
});

module.exports = mongoose.model('JobType', schema);
