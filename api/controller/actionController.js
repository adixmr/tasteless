const Post      = require('../models/post')
const User      = require('../models/user')
const Report    = require('../models/report')

const updatePoints = async (nanoid) => {
    try {
        let post        = await Post.findOne({nanoid})
        let username    = post.user
        let posts       = await Post.find({user: username}) 
        let totalPoints = posts.reduce((prev,next) => prev + next.meta.points, 0); 
        await User.updateOne({username}, {"points.total": totalPoints})
    } catch (err) {
        console.log(err)
    }
}

exports.upvote = async (req, res) => {
    try {
        let post = await Post.findOneAndUpdate({nanoid: req.params.id}, {$pull: {"meta.downvotes.user": self}}, {new: true})  

        if(post.meta.upvotes.user.includes(self))
            var updated = await Post.findOneAndUpdate({nanoid: req.params.id}, {$pull: {"meta.upvotes.user": self}}, {new: true})
        else
            var updated = await Post.findOneAndUpdate({nanoid: req.params.id}, {$addToSet: {"meta.upvotes.user": self}}, {new: true})
        
        let points = updated.meta.upvotes.user.length - updated.meta.downvotes.user.length;
        await Post.findOneAndUpdate({nanoid: id}, {$set: {"meta.points": points}})
        await updatePoints(req.params.id)
        res.json({upvote: 'success', points: points});

    } catch (err) {
        console.log(err)
        return {error: 'Some error occurred'};
    }
}


exports.downvote = async (req, res, next) => {
    try {         
        let post = await Post.findOneAndUpdate({nanoid: req.params.id}, {$pull: {"meta.upvotes.user": self}})  
        
        if(post.meta.downvotes.user.includes(self)){
            var updated = await Post.findOneAndUpdate({nanoid: req.params.id}, {$pull: {"meta.downvotes.user": self}}, {new: true})
        } else {
            var updated = await Post.findOneAndUpdate({nanoid: req.params.id}, {$addToSet: {"meta.downvotes.user": self}}, {new: true})
        }

        let points = updated.meta.upvotes.user.length - updated.meta.downvotes.user.length;
        await Post.findOneAndUpdate({nanoid: req.params.id}, {$set: {"meta.points": points}})
        await updatePoints(req.params.id)
        return {downvote: 'success', points: points};

    } catch (err) {
        return 'Some error occured';
    }
}

exports.comment

const comment   =  async (self, id, body) => {
    if(body=='' || body==undefined){
        return res.status(400).send({
            message: 'This is an error!'
         });
    }
    await Post.updateOne({nanoid: id}, {$addToSet: {"comments": {user: self, body: body}}}, (err, found) => {
        if(err) console.log(err)
    });
    return 'commented';
} 

const commentDelete  =  async (self, postId, commentId) => {
    await Post.updateOne({nanoid: postId}, {$pull: {comments: {_id: commentId}}}, (err, found) => {
        if(err) console.log(err)
    });
    return 'comment deleted';
}

const report    =  async (self, id, message) => {
    await Report.create({user: self, post: id, message: message}, (err, found) => {
        if(err) console.log(err)
    });
    return 'Reported';
} 

const del       =  async (self, id) => {
    if(self){
        await Post.deleteOne({_id: id}, (err, found) => {
            if(err) console.log(err)
        });
        return 'Deleted';
    } else {
        return 'Not Authorised';
    }
} 

module.exports = {upvote, downvote, updatePoints, comment, commentDelete, report, del}