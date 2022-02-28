import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import {Container, Row, Col, Button } from "react-bootstrap";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import Keys from "../../config";
import EditUserInfoModal from "./EditUserInfoModal";
import AddAddressModal from "./AddAddressModal";
axios.defaults.withCredentials = true;

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [userAuth, setUserAuth] = useState(0);

    const [infoModalShow, setinfoModalShow] = useState(false);

    const handleCloseInfoModal = () => setinfoModalShow(false);
    const handleShowInfoModal = () => setinfoModalShow(true);

    const [addressModalShow, setaddressModalShow] = useState(false);

    const handleCloseAddressModal = () => setaddressModalShow(false);
    const handleShowAddressModal = () => setaddressModalShow(true);

    const deleteAddress = async (address_id) => {
      const url = Keys.BASE_API + "user/deleteAddress";
      try {
        var res = await axios.post(url,{address_id:`${address_id}`});
        console.log(res);
        setUserAddress(prevAddress => {
          return prevAddress.filter(address => address.address_id != address_id)
        })
      } catch (error) {
        console.log(error);
      }
    }
    const addAddressFunc = (formData) => {
        console.log("gdgg");
        setUserAddress(prevAddress => {
          return [formData,...prevAddress];
        })
      
    }
    
    useEffect(() => {
      const getUserDetails = async () => {
        console.log("hello");
  
        try {
          const url = Keys.BASE_API + "user/profile";
          const url2 = Keys.BASE_API + "user/login";
          var res = await axios.post(url2,{email:"sho1",password:"sho1"});
          var userInfo = await axios.get(url);
          setUserDetails(userInfo.data.userData);
          setUserAddress(userInfo.data.userAddress);
          setUserAuth(userInfo.data.success);

          console.log(res);
          //console.log(userInfo.data.user.user_id)
          // console.log(userDetails.user);
          //console.log(userDetails.user.user_id);
          // console.log(userAddress);
        } catch (e) {
          console.log(e);
        }
      };
      getUserDetails();
    }, []);
    
    return (    
      <div>
        {!userAuth ? 
           <></>
         : (
          <Container className='container'>
            <h1 style={{textAlign: "center", color: "white"}}>Your Profile</h1> 
          <Row className='mainContent'>
              <Col xl={12}>
          
                  <div className='userInfo'>
                      <div className='userImage'><img src = {userDetails.user.profile_pic}></img></div>
                      {/* <div className='userImage'><img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1VTcdzIfHrD1mnqlyyYKPHFSOvDM4YCOVIA&usqp=CAU"></img></div> */}

                      <div className="userDesc">
                        
                        <p style={{fontSize:"2rem"}}><b>{userDetails.user.name}</b></p>
                        <p><b>Email:</b> {userDetails.user.email}</p>
                        <p><b>Phone:</b> {userDetails.user.primary_mobile}</p>
                        {/* <p style={{fontSize:"2rem"}}><b>Shobha</b></p>
                        <p>Email: shobha@gmail.com</p>
                        <p>Username: shobha9250</p>
                        <p>Mobile: 3333</p> */}
                      </div>
                      <Button onClick={handleShowInfoModal}>
                                  Edit
                                </Button>
                                <EditUserInfoModal
                                  show={infoModalShow}
                                  onHide={handleCloseInfoModal}
                                  user = {userDetails.user}
                                  
                                />
                  </div>
                  
              </Col>
              <Col>
                  <div className='address-heading'><h1>Your registered address:</h1></div>
                  <Button onClick={handleShowAddressModal}>Add Address</Button>
                                <AddAddressModal
                                  show={addressModalShow}
                                  onHide={handleCloseAddressModal}
                                  user = {userDetails.user}
                                  addAddressFunc = {addAddressFunc}/>
                                
                    <div className='userAddresses'>
                      <Row>
                        {userAddress &&
                        userAddress.map((addressElement, i) =>
                          <Col sm={5} className="userAddressCard m-auto">
                          <Row>
                            <Col xs={11 } className="my-auto"><p>{addressElement.address}, {addressElement.city},{addressElement.pincode}</p>
                            <p>Mobile:{addressElement.mobile}</p></Col>
                            
                            <Col xs={1} className="my-auto"><Button onClick={() => deleteAddress(addressElement.address_id)}>X</Button></Col>
                          </Row>
                        </Col>      
                        )}
                        
                      </Row>
                    </div>
              </Col>
          </Row>
      </Container>
        )}
      </div>
    );
  };

export default UserProfile
