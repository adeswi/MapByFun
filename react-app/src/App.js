import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import RouteCreateForm from './components/RouteCreateForm';
import RouteEditForm from './components/RouteEditPage'
import RoutesDashboard from './components/UserRoutesDashboard';
import RoutePage from './components/SoloRoutePage';
import HomePage from './components/Homepage';
import UserFriendsDashboard from './components/UserFriendsDashboard';
import UserNonfriendsDashboard from './components/UserNonfriendsDashboard';
import { authenticate } from './store/session';
import NavBar from '../src/components/NavigationBar';
import UnderConstruction from './components/UnderConstruction';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // if (!loaded) {
  //   return (
  //     <div id="loadingGif">
  //           <img src={"https://cdn.dribbble.com/users/1976516/screenshots/6860281/dribb.gif"} height="400px" width="600px" alt="loading"/>
  //           <div className="loadText">Loading</div>
  //       </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
        <Route path='/login' exact={true}>
        {loaded && (
          <LoginForm/>
          )}
        </Route>
        <Route path='/sign-up' exact={true}>
        {loaded && (
          <SignUpForm/>
          )}
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User/>
        </ProtectedRoute>
        <ProtectedRoute path='/routes/new' exact={true}>
          <RouteCreateForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/routes' exact={true}>
          <RoutesDashboard/>
        </ProtectedRoute>
        <ProtectedRoute path='/routes/:routeId' exact={true}>
          <RoutePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/routes/:routeId/edit' exact={true}>
          <RouteEditForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/people' exact={true} >
          <UserNonfriendsDashboard/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/friends' exact={true}>
          <UserFriendsDashboard/>
        </ProtectedRoute>
        <ProtectedRoute path='/under-construction' exact={true}>
          <UnderConstruction/>
        </ProtectedRoute>
        <Route>
        {loaded && (
          <center>
            <h1 id="h1404">404:</h1>
            Page Not Found
            <div><img alt="test" height="580" width="375" src="https://i.pinimg.com/originals/ec/94/fa/ec94fa24a9d4dca2c0d627039763dbaa.png"></img></div>
          </center>
        )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
