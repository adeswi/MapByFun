import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import{ NavLink, useParams } from 'react-router-dom'
import { getAllUsers, searchAllUsers, getAllNonUserUsers } from "../../store/user";

const AllUserSearchForm = () => {
    const history = useHistory();
    const [term, setTerm] = useState('');
    const userId = useSelector(state => state.session.user?.id)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (term.length === 0) {
                await dispatch(getAllNonUserUsers(userId));
                history.push(`/users/${userId}/search`);
            }
            if (term.length > 0) {
                await dispatch(searchAllUsers(userId, term));
                history.push(`/users/${userId}/search/${term}`);
            }
            setIsLoaded(true)
        })();
    }, [setIsLoaded, dispatch, userId, term, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.length > 0) {
            dispatch(searchAllUsers(userId, term));
            history.push(`/users/${userId}/search/${term}`);
        }
        else if (term.length === 0) {
            dispatch(getAllNonUserUsers(userId));
            history.push(`/users/${userId}/search`);
        }
    }

    const onHandleFormSubmit = (e) => {
        e.preventDefault();
        setTerm('');
        dispatch(getAllNonUserUsers(userId));
        history.push(`/users/${userId}/search`);
    }

    return (
        <div className='searchbarWrap'>
        <form id='searchForm' onSubmit={handleSubmit}>
            <input
            className='searchbarInput'
            placeholder='Discover users'
            value={term}
            onChange= {(e) => setTerm(e.target.value)}/>
            <button className='search-btn' type='submit'>Search</button>
            <button onClick={onHandleFormSubmit}>Reset</button>
        </form>
    </div>
    )
}

export default AllUserSearchForm;
