import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {Button} from 'antd';

function Favorite(props) {
    const [FavoriteNumber,setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const {
        movieId,
        userFrom,
        movieInfo
    } = props;
    const moviePost = movieInfo.backdrop_path;
    const movieTitle = movieInfo.title;
    const movieRunTime = movieInfo.runtime;
    let variables = {
        userFrom ,
        movieId ,
        movieTitle ,
        movieRunTime,
        moviePost
    }


    const onClickFavorite = () => {

        if(Favorited){
            // Favorite Remove
            Axios.post('/api/favorite/removeFromFavorite',variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1);
                    setFavorited(!Favorited);
                }else{
                    alert('Favorite 리스트에서 삭제를 실패했습니다.');
                }
            })
        }else{
            // Favorite Add
            Axios.post('/api/favorite/addToFavorite',variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1);
                    setFavorited(!Favorited);
                }else{
                    alert('Favorite 리스트에 추가를 실패했습니다.');
                }
            })
        }
    }
    useEffect(()=>{
        // 현재 movie가 몇개의 favorite를 받는지 Number 구하기
        Axios.post('/api/favorite/favoriteNumber',variables)
        .then(response => {
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber);
            }else{
                alert('favorite 정보를 가져오는데 실패 했습니다.');
            }
        })
        
        // 현재 유저가 해당 게시글에 favorite했는지 여부 구하기
        Axios.post('/api/favorite/favorited',variables)
        .then(response => {
            if(response.data.success){
                setFavorited(response.data.favorited);
            }else{
                alert('movie를 favorite 하는지에 대한 정보를 가져오는데 실패 했습니다.');
            }
        })
    },[])

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
