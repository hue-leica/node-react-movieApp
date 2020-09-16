import React, { useState, useEffect } from 'react';
import './favorite.css';
import Axios from 'axios';
import {Button, Popover} from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage(props) {

    const [Favorites, setFavorites] = useState([]);

    useEffect(()=>{
        fetchFavoredMovie();
    },[]);

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie',{"userFrom" : window.localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setFavorites(response.data.favorites);
            }else{
                alert("favorite list 조회를 실패했습니다.");
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }
        Axios.post('/api/favorite/removeFromFavorite',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                fetchFavoredMovie();
            }else{
                alert("favorite list에서 지우는 작업을 실패했습니다.")
            }
        })
    }

    const renderCards = Favorites.map((info,index)=>{
        const content = (
            <div>
                {info.moviePost ?
                <img src={`${IMAGE_BASE_URL}w500${info.moviePost}`} /> : "no image"}
            </div>
        )

       return (
        <tr key={index}>
            <Popover content={content} title={`${info.movieTitle}`}>
                <td>{info.movieTitle}</td>
            </Popover>
            <td>{info.movieRunTime}</td>
            <td><Button onClick={()=>onClickDelete(info.movieId, info.userFrom)}>remove</Button></td>
        </tr>
       );
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <td>Movie Title</td>
                        <td>Movie RunTime</td>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                     {/* 가져온 favorite 목록을 map으로 출력! */}
                     {renderCards}
                </tbody>
            </table> 
            
        </div>
    )
}

export default FavoritePage
