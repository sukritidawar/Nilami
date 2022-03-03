import React from 'react'
import { useContext, useReducer, useState } from "react";
import Homepage from './component/Homepage';
import Header from './header/Header';
import Signup from './auth/Signup'
import AuctionProductDetail from './auction/AuctionProductDetail';
import { SignpostOutlined } from '@mui/icons-material';
import UserProfile from './pages/userProfile/UserProfile';
import BiddingPage from './auction/BiddingPage';
import CreatedAuction from './auction/CreatedAuction';
import { BrowserRouter } from "react-router-dom";
import FrontPage from './auth/FrontPage';
import Store from "./store/Store";
import Reducer from "./store/Reducer";

const App = () => {

  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <>

      <BrowserRouter>
        <Store.Provider value={[state, dispatch]}>
          <Signup />

          {/* <Header /> */}
          {/* <BiddingPage/> */}
          <UserProfile />
          {/* <Homepage/> */}
          {/* <AuctionProductDetail/> */}
        </Store.Provider>
        {/* <Signup/> */}
        {/* <FrontPage /> */}
        {/* <Header /> */}

        {/* <BiddingPage/> */}
        {/* <UserProfile/> */}
        {/* <Homepage/>  */}
        {/* <CreatedAuction/> */}
        {/* <AuctionProductDetail /> */}
      </BrowserRouter>


    </>
  )
}
export default App;
