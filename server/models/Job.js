const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    jobType: {
        type: String
    }
});

module.exports = mongoose.model('Job',schema);
