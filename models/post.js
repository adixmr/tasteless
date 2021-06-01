var mongoose = require('mongoose')

const PostSchema  = new mongoose.Schema({
    nanoid:  String,
    user: String,
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      upvotes: {
        user: [{
          type: String
        }]
      },
      downvotes:  {
        user: [{
          type: String
        }]
      },
      points: {
        type: Number, default: 0
      }
    },
    comments: [{
      user: String,
      body: String,
      date: {
        type: Date, default: Date.now
      },
      reply: [{
        body: String,
        date: {
          type: Date, default: Date.now
        }
      }]
    }],
    reports: [{
      user: String,
      message: {
        type: String,
        required: true
      }
    }],
    type: String,
    img: String,
    category: {type: String, default: 'general'},
    subcategory: String
})
 
 
module.exports = mongoose.model('Post', PostSchema);