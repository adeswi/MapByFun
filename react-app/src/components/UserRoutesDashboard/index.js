import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink, useHistory, useParams } from 'react-router-dom'
import UserRouteReadModal from "../UserRoutesReadAll";
import {getAllRoutes, searchAllRoutes} from '../../store/route';
import '../../../src/index.css'

export default function RoutesDashboard(){
    const history = useHistory();
    const [term, setTerm] = useState('');
    const userId = useSelector(state => state.session.user?.id)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            setIsLoaded(true)
            await dispatch(getAllRoutes(userId))
            if (term.length > 0) {
                await dispatch(searchAllRoutes(userId, term));
                history.push(`/users/${userId}/search/${term}`);
            }
        })();
    }, [setIsLoaded, dispatch, userId, term, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.length > 0) {
            dispatch(searchAllRoutes(userId, term));
            history.push(`/users/${userId}/search/${term}`);
        }
        else if (term.length === 0 || !term) {
            dispatch(getAllRoutes(userId))
            history.push(`/search`);
        }
    }

    return (<>
        {isLoaded && (
            <>
                <div className="routes-wrapper">
                <h3>MY ROUTES</h3>
                <hr></hr>

                <div className='searchbarWrap'>
                    <form className='searchForm' onSubmit={handleSubmit}>
                        <input
                        className='searchbarInput'
                        placeholder='Discover projects'
                        value={term}
                        onChange= {(e) => setTerm(e.target.value)}/>
                        <button className='search-btn' type='submit'>Search</button>
                    </form>
                </div>

                <button className="createRouteBtn" onClick={(e) => {
                    e.preventDefault();
                    history.push('/routes/new');
                    }}>Create a Route</button>

                <hr id="testHr"></hr>
                <table className='routes'>
                <thead>
                    <tr>
                    <th className='tt'>Route Name</th>
                    <th className='tt'>Created</th>
                    <th className='tt'>Activity</th>
                    <th className='tt'>Privacy</th>
                    <th className='tt'>Distance</th>
                    <th className='tt'>Options</th>
                    </tr>
                </thead>
                </table>
                    <center><UserRouteReadModal userId={userId}/></center>
                </div>
            </>
        )}
    </>
    )
}
