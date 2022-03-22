import React, { useEffect } from 'react'
import { useContext, useReducer, useState } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import AuctionProductDetail from './auction/AuctionProductDetail';
import AddAddressModal from "./pages/userProfile/AddAddressModal";
import BiddingPage from './pages/BiddingPage';
import CreatedAuction from './auction/CreatedAuction';
import CreateAuctionModal from './pages/myAuctions/CreateAuctionModal';
import Cookies from 'js-cookie';
import Chat from './auction/chatApp/Chat'
import EditUserInfoModal from "./pages/userProfile/EditUserInfoModal";
import FrontPage from './auth/FrontPage';
import Feed from "./component/Feed"
import Homepage from './component/Homepage';
import Header from './component/header/Header';
import Login from './auth/Login';
import { LOGIN } from "./store/Types";
import RegisteredAuction from './auction/RegisteredAuction';
import Reducer from "./store/Reducer";
import Signup from './auth/Signup'
import { SignpostOutlined } from '@mui/icons-material';
import Store from "./store/Store";
import UserProfile from './pages/userProfile/UserProfile';
import LoadingIndicator from './component/LoadingIndicator';


const Routess = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (Cookies.get("token")) {
      const user_id = Cookies.get("user_id");
      const user_name = Cookies.get("user_name");
      dispatch({
        type: LOGIN,
        user_id: `${user_id}`,
        user_name: `${user_name}`
      });
      return;
    } else {
      console.log("token is not there...");
    }
  }, [])
  return (
    <Store.Provider value={[state, dispatch]}>
      <Header />
      <LoadingIndicator />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/feed" element={<Homepage />} />
        <Route exact path="/feed/:id" element={<AuctionProductDetail />} />
        <Route exact path="/feed/:id/biding" element={<BiddingPage />} />
        <Route exact path="/feed/:id/chat" element={<Chat />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/registeredauction" element={<RegisteredAuction />} />
        <Route exact path="/myauction" element={<CreatedAuction />} />

      </Routes>
    </Store.Provider>
  )
}
export default Routess;
