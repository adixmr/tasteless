var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    ismod: Boolean,
    isadmin: Boolean,
    joindate: { type: Date, default: Date.now },
    points: {
        total: {type: Number, default: 0},
        today: {type: Number, default: 0},
        week: {type: Number, default: 0},
        month: {type: Number, default: 0},
    },
    posts: {
        jokes: {type: Number, default: 0},
        memes: {type: Number, default: 0}
    },
    blocked: [ {type: String} ],
    blockedby: [ {type: String} ],
    followed: [ {type: String} ],
    followers: [ {type: String} ],
    profile: {
        dob: Date,
        bio: String,
        picture: String
    }
})
 
module.exports = mongoose.model('User', UserSchema);