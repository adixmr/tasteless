var mongoose = require('mongoose')

const ReportSchema  = new mongoose.Schema({
    user: String,
    post: String,
    profile: String,
    message: String,
    date: { type: Date, default: Date.now }
})
 
module.exports = mongoose.model('Report', ReportSchema);