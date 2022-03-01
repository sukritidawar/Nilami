import React from 'react'
import Homepage from './component/Homepage';
import Header from './header/Header';
import Signup from './auth/Signup'
import AuctionProductDetail from './auction/AuctionProductDetail';
import { SignpostOutlined } from '@mui/icons-material';
// import UserProfile from './pages/userProfile/UserProfile';
import BiddingPage from './auction/BiddingPage';


const App = () => {
  

  return (
    <>
      {/* <Signup/> */}
      
      <Header />
      <BiddingPage/>
      {/* <UserProfile/> */}
      {/* <Homepage/> */}
      {/* <AuctionProductDetail/> */}

    </>
  )
}

export default App
