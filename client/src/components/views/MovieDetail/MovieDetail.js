import React, { useEffect, useState, Fragment } from 'react'
import MainImage from '../LandingPage/Sections/MainImage';
import {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL
} from '../../Config';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import {Row,Button} from 'antd';
import Favorite from './Sections/Favorite'

function MovieDetail(props) {
    const [Movie, setMovie] = useState([]);
    const [Casts,setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    let movieId = props.match.params.movieId; // 하위 컴포넌트에서 URL에 접근한 값을 빼는 방법! (props,match 이용)
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    useEffect(()=>{
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response);
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast);
        })
    },[]);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }
    return (
        <div>

            {/* Header */}
            <MainImage
                 image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                 title={Movie.original_title}
                 text={Movie.overview}
                 ></MainImage>
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}></Favorite>
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie} />
                <br />

                {/* Actor Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}> Toggle Actor View </Button>
                </div>
                {
                    ActorToggle &&
                        <Row gutter={[16,16]}>
                            {Casts && Casts.map((cast, index)=>(
                                <Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                    >
                                    </GridCards>
                                </Fragment>
                            ))}
                        </Row>
                }
            </div>
        </div>
    );
}

export default MovieDetail
