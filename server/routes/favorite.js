const express = require('express')
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Favorite } = require("../models/Favorite");

router.post('/favoriteNumber',(req, res) => {

    const { userFrom, movieId } = req.body;

    Favorite.find({ "movieId": movieId })
    .exec(( err, info )=>{
        if(err) return res.status(400);

        res.status(200).json({ success: true, favoriteNumber: info.length });
    })
});
    
router.post('/favorited',(req, res) => {

    const { userFrom, movieId } = req.body;

    Favorite.find({ "movieId": movieId , "userFrom": userFrom})
    .exec(( err, info )=>{
        if(err) return res.status(400);
        let result = false;
        if(info.length !== 0)
            result = true;
        res.status(200).json({ success: true, favorited: result });
    })
});

router.post('/removeFromFavorite',(req, res) => {

    const { userFrom, movieId } = req.body;

    Favorite.findOneAndDelete({
        movieId: movieId,
        userFrom: userFrom
    })
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            success: true
        })
    })
});

router.post('/addToFavorite',(req, res) => {

    const favorite = new Favorite(req.body);
    favorite.save((err, doc)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            success: true
        });
    })
});

router.post('/getFavoredMovie',(req, res) => {

    const {userFrom} = req.body;
    Favorite.find({ userFrom : userFrom})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            favorites: info
        });
    })
});

router.post('/removeFromFavorite',(req, res) => {

    const {
        userFrom,
        movieId
    } = req.body;

    Favorite.findOneAndDelete({ movieId:movieId, userFrom:userFrom })
    .exec((err, result)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            success: true
        })
    })
});

module.exports = router; 