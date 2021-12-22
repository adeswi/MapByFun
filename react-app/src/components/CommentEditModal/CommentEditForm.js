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
        if(content.length > 400) {
            error.push('. : Please enter a description shorter than 400 characters.')
        }
        else if(content.length < 3) {
            error.push('. : Please enter a description longer than three letters.')
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
            const data = await dispatch(editComment(payload, commentId))
            if (data){
                setErrors(data)
            } else {
                setShowModal(false);
            }
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <div className="errors">
                    {errors.map((error, idx) => (
                    <div key={idx}>{error.split(':')[1]}</div>
                ))}
                </div>
                <input
                className='commentContent'
                placeholder='Content'
                required
                value={content}
                onChange= {(e) => setContent(e.target.value)}/>
                <button type='submit' className="contentEditModalBtn">Submit</button>
            </form>
        </div>
    )
}

export default CommentEditForm;