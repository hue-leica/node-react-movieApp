const express = require('express')
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post('/saveComment', (req, res)=>{

    const comment = new Comment(req.body);
    comment.save((err, comment)=>{
        if(err) res.status(400).send(err);
        //console.log(comment);

        // comment 정보는 가져왔음 그런데 writer(user)의 이미지와 이름 정보가 없다!
        // comment 정보로 writer 정보 가져오기
        Comment.find({_id: comment._id})
            .populate('writer') // 스키마 정의할 때 Schema.Type.ObjectId로 해둔 것에 ref로 해당 객체를
                                 // 지정하는데 이렇게 ref로 지정한 정보도 함께 가져오는 것이 .popular()이다. 
            .exec((err, result)=>{
                if(err) return res.status(400).send(err);
                return res.status(200).json({
                    success: true,
                    result : result
                });
            })
    });
});

router.post('/getComment', (req, res)=>{
    const {movieId} = req.body;

    Comment.find({movieId: movieId})
    .populate('writer')
    .exec((err, comments)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            comments: comments
        });
    })
});

module.exports = router; 