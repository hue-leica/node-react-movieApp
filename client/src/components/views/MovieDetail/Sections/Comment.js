import Axios from 'axios';
import React, { useEffect, useState, Fragment }from 'react'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const movieId = props.match.params.movieId;
    const user = useSelector(state => state.user); // redux에서 state 가져오는 방법
    const [CommentValue, setCommentValue] = useState("");
    
    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables ={ 
            content: CommentValue,
            writer: user.userData._id,
            movieId: movieId
        }

        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                //console.log(response.data.result);
                props.refreshFunction(response.data.result);
                setCommentValue("");
            }else{
                alert("comment 저장에 실패했습니다.");
            }
        })
    }


    return (
        <div>
            <h2 >Comments</h2>
            <hr />
            {/* Comment list */}
            {props.comments &&
                props.comments.map((comment, index)=>(
                    (!comment.responseTo &&
                        <Fragment>
                            <SingleComment key={index} movieId={movieId} comment={comment} refreshFunction={props.refreshFunction}/>
                            <ReplyComment  parentCommentId={comment._id} comments={props.comments} movieId={movieId} refreshFunction={props.refreshFunction}/>
                        </Fragment>
                    )
                ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }}>
                <textarea
                style={{width: '100%', borderRadius: '5px' }}
                onChange={handleClick}
                value={CommentValue}
                placeholder="코멘트를 작성해주세요"
                >
                
                </textarea>
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment;
