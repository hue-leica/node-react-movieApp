import React, {Fragment, useEffect, useState} from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments,setOpenReplyComments] = useState(false);

    useEffect(()=>{
       let commentNumber = 0;
       props.comments.map((comment, index)=>{

            if(comment.responseTo === props.parentCommentId){
                    commentNumber++;
                    //console.log('comment.responseTo',comment.responseTo);
                    //console.log('props.parentCommentId',props.parentCommentId);
            }
       });
       setChildCommentNumber(commentNumber); 
    },[props.comments])

    // const renderReplyComment = (parentCommentId) =>{
    //     props.comments.map((comment, index)=>(
    //         <Fragment>
    //             { comment.responseTo === parentCommentId && 
    //             <div style={{ width: '80%', marginLeft: '40px' }}>
    //                     <SingleComment movieId={props.movieId} comment={comment} refreshFunction={props.refreshFunction}/>
    //                     <ReplyComment parentCommentId={comment._id} comments={props.comments} movieId={props.movieId} refreshFunction={props.refreshFunction}/>
    //             </div>
    //             }
    //         </Fragment>
    //     ));
    // }
    const onHandleChange = ()=> {
        setOpenReplyComments(!OpenReplyComments);
        //console.log(OpenReplyComments);
    }
    return (
        <div>
            { ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>
            }
            {
                OpenReplyComments && //renderReplyComment(props.parentCommentId)
                props.comments.map((comment, index)=>(
                    <Fragment>
                        { comment.responseTo === props.parentCommentId && 
                        <div style={{ width: '80%', marginLeft: '40px' }}>
                                <SingleComment movieId={props.movieId} comment={comment} refreshFunction={props.refreshFunction}/>
                                <ReplyComment parentCommentId={comment._id} comments={props.comments} movieId={props.movieId} refreshFunction={props.refreshFunction}/>
                        </div>
                        }
                    </Fragment>
                ))
            }
        </div>
        
    )
}

export default ReplyComment
