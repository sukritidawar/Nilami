import React, { useEffect } from 'react';
import { useContext, useReducer, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AuctionProductDetail from './pages/auction/AuctionProductDetail';
import BiddingPage from './pages/bidding/BiddingPage';
import CreatedAuction from './pages/createdAuctions/CreatedAuction';
import Cookies from 'js-cookie';
import Chat from './UIComponents/chatApp/Chat';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/auth/Login';
import { LOGIN } from './store/Types';
import RegisteredAuction from './pages/registeredAuctions/RegisteredAuction';
import Reducer from './store/Reducer';
import Signup from './pages/auth/Signup';
import Store from './store/Store';
import UserProfile from './pages/userProfile/UserProfile';
import LoadingIndicator from './UIComponents/LoadingIndicator';

const Routess = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (Cookies.get('token')) {
      const user_id = Cookies.get('user_id');
      const user_name = Cookies.get('user_name');
      dispatch({
        type: LOGIN,
        user_id: `${user_id}`,
        user_name: `${user_name}`,
      });
      return;
    } else {
      console.log('token is not there...');
    }
  }, []);
  return (
    <Store.Provider value={[state, dispatch]}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/feed" element={<Homepage />} />
        <Route exact path="/feed/:id" element={<AuctionProductDetail />} />
        <Route exact path="/feed/:id/biding" element={<BiddingPage />} />
        <Route exact path="/feed/:id/chat" element={<Chat />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route
          exact
          path="/registeredauction"
          element={<RegisteredAuction />}
        />
        <Route exact path="/myauction" element={<CreatedAuction />} />
      </Routes>
      <LoadingIndicator />
    </Store.Provider>
  );
};
export default Routess;
