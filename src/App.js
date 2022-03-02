import React from 'react'
import Homepage from './component/Homepage';
import Header from './header/Header';
import Signup from './auth/Signup'
import AuctionProductDetail from './auction/AuctionProductDetail';
import { SignpostOutlined } from '@mui/icons-material';
// import UserProfile from './pages/userProfile/UserProfile';
import BiddingPage from './auction/BiddingPage';
import CreatedAuction from './auction/CreatedAuction';
import { BrowserRouter } from "react-router-dom";
import FrontPage from './auth/FrontPage';
const App = () => {


  return (
    <>
      <BrowserRouter>
      
        {/* <Signup/> */}
        <FrontPage />
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

export default App
