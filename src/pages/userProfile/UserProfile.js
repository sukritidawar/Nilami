/* UI for siaplaying User deatils.
Displays the following user details:
  Name,
  Mobile Number,
  Email,
  Address
Allows to delete/add user address.
*/
import { React, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import Keys from '../../config';
import EditUserInfoModal from '../../UIComponents/modals/EditUserInfoModal';
import AddAddressModal from '../../UIComponents/modals/AddAddressModal';
import Store from '../../store/Store';
import Header from '../../UIComponents/Header';
import { trackPromise } from 'react-promise-tracker';
axios.defaults.withCredentials = true;

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userAuth, setUserAuth] = useState(Store);

  const [infoModalShow, setinfoModalShow] = useState(false);

  const handleCloseInfoModal = () => setinfoModalShow(false);
  const handleShowInfoModal = () => setinfoModalShow(true);

  const [addressModalShow, setaddressModalShow] = useState(false);

  const handleCloseAddressModal = () => setaddressModalShow(false);
  const handleShowAddressModal = () => setaddressModalShow(true);

  // Deletes the address from the user database.
  const deleteAddress = async (address_id) => {
    const url = Keys.BASE_API + 'user/deleteAddress';
    try {
      var res = await axios.post(url, { address_id: `${address_id}` });
      console.log(res);
      setUserAddress((prevAddress) => {
        return prevAddress.filter(
          (address) => address.address_id != address_id
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Adds address for the user.
  const addAddressFunc = (formData) => {
    setUserAddress((prevAddress) => {
      return [formData, ...prevAddress];
    });
  };

  // Gets user details from the database.
  const getUserDetails = async () => {
    try {
      const url = Keys.BASE_API + 'user/profile';
      trackPromise(
        axios.get(url).then((res) => {
          setUserDetails(res.data.userData);
          setUserAddress(res.data.userAddress);
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    await getUserDetails();
    console.log(userDetails);
  }, []);

  return (
    <div>
      <Header />
      {!userDetails ? (
        <p> </p>
      ) : (
          <Container className="container">
            <h1 style={{ textAlign: 'center', color: 'white' }}>Your Profile</h1>
            <div className="mainContent">
              <div className="userInfo">
                <div className="userImage">
                  <img src={userDetails.user.profile_pic} />
                </div>

                <div className="userDesc">
                  <p style={{ fontSize: '2rem' }}>
                    <b>{userDetails.user.name}</b>
                  </p>
                  <p>
                    <b>Email:</b> {userDetails.user.email}
                  </p>
                  <p>
                    <b>Phone:</b> {userDetails.user.primary_mobile}
                  </p>
                </div>
                <Button
                  variant="contained"
                  onClick={handleShowInfoModal}
                  style={{ backgroundColor: '#00B9F1', color: 'white' }}
                >
                  Edit
              </Button>
                <EditUserInfoModal
                  show={infoModalShow}
                  onHide={handleCloseInfoModal}
                  user={userDetails.user}
                />
              </div>
              <div className="address">
                <div className="address-heading">
                  <h3>Your registered addresses:</h3>
                </div>
                <div className="userAddresses">
                  <Row>
                    {userAddress &&
                      userAddress.map((addressElement, i) => (
                        <Col md={5} className="userAddressCard mx-auto m-1">
                          <Row>
                            <Col xs={11} className="my-auto">
                              <p>
                                {addressElement.address}, {addressElement.city},
                              {addressElement.pincode}
                              </p>
                              <p>Mobile:{addressElement.mobile}</p>
                            </Col>

                            <Col xs={1} className="my-auto">
                              <Button
                                className="btn-danger"
                                onClick={() =>
                                  deleteAddress(addressElement.address_id)
                                }
                                style={{ backgroundColor: '#002E6E' }}
                              >
                                X
                            </Button>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                  </Row>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <Button
                    variant="contained"
                    onClick={handleShowAddressModal}
                    style={{ backgroundColor: '#00B9F1', color: 'white' }}
                  >
                    Add Address
                </Button>
                </div>
                <AddAddressModal
                  show={addressModalShow}
                  onHide={handleCloseAddressModal}
                  user={userDetails.user}
                  addAddressFunc={addAddressFunc}
                />
              </div>
            </div>
          </Container>
        )}
    </div>
  );
};

export default UserProfile;