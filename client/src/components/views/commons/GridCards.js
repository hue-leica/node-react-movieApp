import React from 'react'
import { Col } from 'antd';

function GridCards(props) {

    if(props.landingPage){ // Landing Page를 위한 것
        return(
        <Col lg={6} md={8} xs={24}> 
            <div style={{ position: 'relative' }}>
                <a href = {`/movie/${props.movieId}`}>
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName}/>
                </a>
            </div>
        </Col> 
        );
    }else{ // Movie Detail에서 actor 처리 하기 위한 것
        return (
        <Col lg={6} md={8} xs={24}> 
            <div style={{ position: 'relative' }}>
                <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName}/>
            </div>
        </Col> 
        );
    }
}

export default GridCards
