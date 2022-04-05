/* Modal to add new user address. It is used in user profile page*/

import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
axios.defaults.withCredentials = true;

const AddAddressModal = (props) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    mobile: '',
  });

  const [feedback, setFeedback] = useState({
    feedback: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    send(formData);
    setFormData({
      address: '',
      city: '',
      pincode: '',
      mobile: '',
    });
    props.onHide();
  };

  const handleFeedback = (msg) => {
    setFeedback({
      feedback: msg,
    });
  };

  // Adds new address details for th user in the database.
  const send = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      console.log(body);
      const response = await axios.post(
        `${Keys.BASE_API}user/addAddress`,
        body,
        config
      );
      console.log(response.data);
      props.addAddressFunc(formData);
      handleFeedback('Address added');
    } catch (error) {
      console.log(error);
      handleFeedback('Something went wrong, Try Again.');
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ borderRadius: '4px' }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ alignItems: 'center' }}>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ textAlign: 'center' }}>Hi {props.user.name} !</h5>
        <h6 style={{ textAlign: 'center' }}>
          Please enter the following details.
        </h6>
        <form
          style={{ textAlign: 'center', padding: '10px' }}
          onSubmit={handleSubmit}
          method="POST"
        >
          <div style={{ padding: '10px' }}>
            <input
              name="address"
              required="required"
              type="string"
              placeholder="address"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="city"
              required="required"
              type="string"
              placeholder="city"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="pincode"
              required="required"
              type="string"
              placeholder="pincode"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="mobile"
              required="required"
              type="string"
              placeholder="mobile"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              padding: '10px',
            }}
          >
            <button
              type="submit"
              onClick={handleSubmit}
              style={{ backgroundColor: '#00B9F1', color: 'white' }}
            >
              Add
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAddressModal;
