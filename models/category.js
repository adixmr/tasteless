var mongoose = require('mongoose')

const CatergorySchema  = new mongoose.Schema({
    name: String,
    allowed: String,
    subcategory: [{
        name: String,
        allowed: String
    }]
})
 
module.exports = mongoose.model('Category', CatergorySchema);