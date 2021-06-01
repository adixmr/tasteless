var mongoose = require('mongoose')

const MessagesSchema  = new mongoose.Schema({
    users: {
        user1: {
            type: String,
        },
        user2: {
            type: String,
        }
    },
    messages: [{
        message: String,
        sender: String,
        time: {
            type: Date,
            default: Date.now
        }
    }]
})
 
module.exports = mongoose.model('Message', MessagesSchema);