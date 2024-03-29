import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import {editComment} from '../../store/comment'
import './CommentEditModal.css'

const CommentEditForm = ({routeId, commentId, acontent, setShowModal}) => {
    const [content, setContent] = useState(acontent);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const validator = () => {
        let error = []
        if(content.length > 401) {
            error.push('. : Please enter a description shorter than 400 characters.')
        }
        else if(content.length < 4) {
            error.push('. : Please enter a description longer than 3 characters.')
        }
        return error;
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const errorsArr = validator()
        if(errorsArr.length) {
            setErrors(errorsArr)
        }else{
            const payload = {
                routeId,
                content,
                commentId,
            }
            const data = await dispatch(editComment(payload))
            if (data){
                setErrors(data)
            } else {
                setShowModal(false);
            }
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <div className='deleteModal3'>
            <div className="errors0">
                {errors?.map((error, idx) => (
                <div key={idx}>{error.split(':')[1]}</div>
            ))}
            </div>
            <form className='form3' onSubmit={handleSubmit}>
                <textarea
                className='commentContent'
                placeholder='Content'
                required
                value={content}
                onChange= {(e) => setContent(e.target.value)}/>
                <div className="yesNCanelBtnsWrap2">
                    <button type='submit' id="friendUnfriendConfirmBtn1">Update</button>
                    <button type="submit" onClick={handleCancel} id="friendUnfriendConfirmBtn1">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CommentEditForm;
