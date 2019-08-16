const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    date: {
        type: String
    },
    comment: {
        type: String
    },
    errorJobList: [{
        url: {
            type: String
        }
    }]
});

module.exports = mongoose.model('History', schema);
