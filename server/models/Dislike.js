const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId:{
        type:Schema.Types.ObjectId,
        ref: 'Comment'
    }
},{timestamps: true}) // 생성 시간 추가 시간 등의 시간들을 관리해주는 녀석


const Dislike = mongoose.model('dislikeSchema', dislikeSchema);

module.exports = { Dislike }