import React, { useEffect } from 'react'
import { useContext, useReducer, useState } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import AuctionProductDetail from './auction/AuctionProductDetail';
import BiddingPage from './auction/BiddingPage';
import CreatedAuction from './auction/CreatedAuction';
import Cookies from 'js-cookie';
import FrontPage from './auth/FrontPage';
import Feed from "./component/Feed"
import Homepage from './component/Homepage';
import Header from './header/Header';
import Login from './auth/Login';
import { LOGIN } from "./store/Types";
import RegisteredAuction from './auction/RegisteredAuction';
import Reducer from "./store/Reducer";
import Signup from './auth/Signup'
import { SignpostOutlined } from '@mui/icons-material';
import Store from "./store/Store";
import UserProfile from './pages/userProfile/UserProfile';


const Routess = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (Cookies.get("token")) {
      const user_id = Cookies.get("user_id");
      dispatch({
        type: LOGIN,
        user_id: `${user_id}`
      });
      return;
    }else{
      console.log("sfas");
    }
  },[])
  return (
      <Store.Provider value={[state, dispatch]}>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/feed" element={<Homepage />} />
      <Route exact path="/feed/:id" element={<AuctionProductDetail />} />
      <Route exact path="/feed/:id/biding" element={< BiddingPage />} />
      
      </Routes>
      {/* <Signup/> */}
      {/* <Login /> */}
      {/* <Header/> */}
      {/* <CreatedAuction/> */}
      <RegisteredAuction/>
     
      {/* <BiddingPage/> */}
      {/* <UserProfile/> */}
      {/* <Homepage/> */}
      {/* <AuctionProductDetail/> */}
      </Store.Provider>
  )
}
export default Routess;
