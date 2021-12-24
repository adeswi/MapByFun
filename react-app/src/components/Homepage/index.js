import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink } from 'react-router-dom'
import {getAllUsers} from  '../../store/user'
import {getAllFriends} from '../../store/friend'
import "./Homepage.css"

export default function HomePage(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            await dispatch(getAllUsers());
            setIsLoaded(true)
        })();
    }, [dispatch, sessionUser])

    return (<> {isLoaded && (
                <div>
                    <h1>My Home Page</h1>
                    <div><NavLink to={`/users/${sessionUser.id}/routes`}>Route Dashboard Placeholder</NavLink></div>
                    <div><NavLink to={`/users/${sessionUser.id}/friends`}>Friends Dashboard Placeholder</NavLink></div>
                    <div><NavLink to={`/users/${sessionUser.id}/people`} exact={true}>All Nonfriend Users Dashboard Placeholder</NavLink></div>
                    <div><NavLink to={`/users`} exact={true}>All Users Dashboard Placeholder</NavLink></div>
                </div>
                )}
            </>
            )
}
