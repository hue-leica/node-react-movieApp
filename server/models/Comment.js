const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
},{timestamps: true}) // 생성 시간 추가 시간 등의 시간들을 관리해주는 녀석


const Comment = mongoose.model('commentSchema', commentSchema);

module.exports = { Comment }