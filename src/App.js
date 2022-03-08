import React, { useEffect } from 'react'
import { useContext, useReducer, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Homepage from './component/Homepage';
import Header from './header/Header';
import Login from './auth/Login';
import Signup from './auth/Signup'
import AuctionProductDetail from './auction/AuctionProductDetail';
import { SignpostOutlined } from '@mui/icons-material';
import UserProfile from './pages/userProfile/UserProfile';
import BiddingPage from './auction/BiddingPage';
import CreatedAuction from './auction/CreatedAuction';
import RegisteredAuction from './auction/RegisteredAuction';
import FrontPage from './auth/FrontPage';
import Store from "./store/Store";
import Reducer from "./store/Reducer";
import { LOGIN } from "./store/Types";
import Cookies from 'js-cookie';

const App = () => {
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
      {/* <Signup/> */}
      <Login />
      {/* <Header/> */}
      {/* <CreatedAuction/> */}
      {/* <RegisteredAuction/> */}
     
      {/* <BiddingPage/> */}
      {/* <UserProfile/> */}
      {/* <Homepage/> */}
      {/* <AuctionProductDetail/> */}
      </Store.Provider>
  )
}
export default App;
