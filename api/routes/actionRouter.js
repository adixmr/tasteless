var express     = require('express');
var router      = express.Router();
const action    = require('../controller/action.js');

router.post('/upvote/:id', action.upvote);

router.post('/downvote/:id', action.downvote);

router.post('/comment/:id', action.comment);


router.delete('/comment/:postid/:commentid', async (req, res, next) => {
    var response = await action.commentDelete(req.session.username, req.params.postid, req.params.commentid)
    res.send(response)  
});

router.post('/report/:id', async (req, res, next) => {
    var response = await action.report(self, req.params.id, req.query.message)
    res.send(response)
});

router.get('/delete/:id', async (req, res, next) => {
    var response = await action.del('test', req.params.id)
    res.send(response)
});

module.exports = router;
