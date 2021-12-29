import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import RouteForm from './components/RouteCreateForm';
import RoutesDashboard from './components/UserRoutesDashboard';
import RoutePage from './components/SoloRoutePage';
import HomePage from './components/Homepage';
import RouteEditPage from './components/RouteEditPage'
import UserFriendsDashboard from './components/UserFriendsDashboard';
import UserNonfriendsDashboard from './components/UserNonfriendsDashboard';
import { authenticate } from './store/session';
import NavBar from '../src/components/NavigationBar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm/>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User/>
        </ProtectedRoute>
        <ProtectedRoute path='/routes/new' exact={true}>
          <RouteForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/routes' exact={true}>
          <RoutesDashboard/>
        </ProtectedRoute>
        <ProtectedRoute path='/routes/:routeId' exact={true}>
          <RoutePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/routes/:routeId/edit' exact={true}>
          <RouteEditPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/people' exact={true} >
          <UserNonfriendsDashboard/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/friends' exact={true}>
          <UserFriendsDashboard/>
        </ProtectedRoute>
        <Route>
        <center>
          <h1 id="h1404">404:</h1>
          Page Not Found (yet)
          <div><img alt="test" height="580" width="400" src="https://i.pinimg.com/originals/1d/c7/f9/1dc7f97fd25ba503520fc6ed4022f75e.jpg"></img></div>
          {/* <img alt="test" height="650" width="400" src="https://i.pinimg.com/originals/ec/94/fa/ec94fa24a9d4dca2c0d627039763dbaa.png"></img> */}
        </center>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
