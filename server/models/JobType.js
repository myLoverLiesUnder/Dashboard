const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    typeName: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('JobType',schema);
