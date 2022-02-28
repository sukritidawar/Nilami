import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useHistory,
} from "react-router-dom";
import UserProfile from "./pages/userProfile/UserProfile";

const App = () => {
  let routes = (
    <Routes>
      <Route path="/user/profile" element={<UserProfile />} />
    </Routes>
  );
  return (
    // <div>
    //   <Routes>
    //     <div className = "routes">{routes}</div>
    //   </Routes>
    // </div>
    <UserProfile />
  )
}

export default App
