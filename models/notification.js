var mongoose = require('mongoose')

const NotiSchema  = new mongoose.Schema({
    username: String,
    body:   String,
    date: { type: Date, default: Date.now },
    url: String
})
 
module.exports = mongoose.model('Notification', NotiSchema);