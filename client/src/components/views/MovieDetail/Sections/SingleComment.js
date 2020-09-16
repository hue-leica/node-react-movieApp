import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReplay, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplayOpen = () => {
        setOpenReply(!OpenReplay);
    }
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const variables ={ 
            content: CommentValue,
            writer: user.userData._id,
            movieId: props.movieId,
            responseTo: props.comment._id
        }
        console.log(variables);

        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result);
                props.refreshFunction(response.data.result);
                setCommentValue("");
                //setOpenReply(false);
            }else{
                alert("comment 저장에 실패했습니다.");
            }
        })
    }
    const actions = [
        <span onClick={onClickReplayOpen} key="comment-basic-reply-to" >Reply to</span>
    ]
    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={props.comment.content}
            />
            {OpenReplay && 
                    <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                        <textarea
                            style={{width: '100%', borderRadius: '5px' }}
                            onChange={onHandleChange}
                            value={CommentValue}
                            placeholder="코멘트를 작성해주세요"
                        >
                        </textarea>
                        <br />
                        <button style={{ width: '20%', height: '52px' }}>Submit</button>
                    </form>
            }
        </div> 
    )
}

export default SingleComment
