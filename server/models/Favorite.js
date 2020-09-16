const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
   userFrom: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   movieTitle: {
       type: String
   },
   movieId: {
       type: String
   },
   moviePost: {
       type: String
   },
   movieRunTime: {
       type: String
   }
},{timestamps: true}) // 생성 시간 추가 시간 등의 시간들을 관리해주는 녀석


const Favorite = mongoose.model('favoriteSchema', favoriteSchema);

module.exports = { Favorite }