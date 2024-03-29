import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllNonFriends} from  '../store/nonfriend';
import FriendBtns from '../components/AddDeleteFriendBtns';
import '../../src/index.css'
import {getAllUsers, getAllNonUserUsers} from '../store/user'
import { getAllFriends } from '../store/friend';
import AllUserSearchForm from '../components/AllUserSearchbar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const {userId} = useParams();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
        await dispatch(getAllFriends(sessionUser?.id));
        await dispatch(getAllNonUserUsers(sessionUser?.id));
        // await dispatch(getAllNonFriends(userId));
        // const response = await fetch('/api/users');
        // const responseData = await response.json();
        // setUsers(responseData.users);
        setIsLoaded(true)
    })();
  }, [dispatch, sessionUser?.id]);

  const allUsersList = useSelector(state => Object.values(state.users.searchedUsers || state.users))

  const userComponents = allUsersList.map((user) => {
    if (user.id !== sessionUser?.id) {

    return (<> {isLoaded && (
      <div className="friendCard">
        <div className="soMany">
          <NavLink className="soMany" exact to={`/users/${user.id}`}>
            <div><img className="friendContent" src={user.profile_picture}/></div>
            <div className="fullName">{user.first_name}&nbsp;{user.last_name}</div>
          </NavLink>
            <div className="friendBtn"><FriendBtns user_id={sessionUser?.id} friend_id={user.id}/></div>
        </div>
      </div>)}
      </>
    );
  }});

  // if (!isLoaded) {
  //   return (
  //     <div id="loadingGif">
  //           <img src={"https://cdn.dribbble.com/users/1976516/screenshots/6860281/dribb.gif"} height="400px" width="600px" alt="loading"/>
  //           <div className="loadText">Loading</div>
  //       </div>
  //   );
  // }

  if (!isLoaded) {
    return (
    <div id="t">
        <video id="mediaContent" preload="none" muted="" loop="" playsinline="" autoplay="" src="https://cdn.dribbble.com/users/4187655/screenshots/8421375/media/eaa37c1d3e989e818ab5cd3748a09867.mp4">
        </video>
        <div className="loadText">Loading</div>
    </div>
    );
  }

  return (<>
      {isLoaded &&(
        <>
        <div className="topoBackground">
          <div className="friendLinks">
            <NavLink exact to={`/users/${sessionUser?.id}/search`} activeClassName="link-active" className="links">My Friends</NavLink>&nbsp;&nbsp;&nbsp;
            <NavLink exact to={`/users/${sessionUser?.id}/find`} activeClassName="link-active" className="links">Find Friends</NavLink>&nbsp;&nbsp;&nbsp;
            <NavLink exact to={`/users/${sessionUser?.id}/discover`} activeClassName="link-active" className="links">All Users</NavLink>
          </div>

          <div className="titleTry2">
          <hr className="testAlign2"></hr>
            {/* <h3 id="testAlign3">Search All Users by First or Last Name:</h3> */}
              <AllUserSearchForm/>
            <hr className="testAlign2"></hr>
          </div>

          <div className="titleTry">
          <h3 className="testAlign">All Users</h3>
          </div>

          <div className="friendDashboardContainer">{userComponents}</div>
        </div>
        </>
      )}
    </>
  );
}

export default UsersList;
