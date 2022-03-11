import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
axios.defaults.withCredentials = true;

const CreateAuctionModal = (props) => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_details: '',
    product_category: '',
    product_pic: '',
    estimated_price: '',
    starting_price: '',
    city: '',
    pincode: '',
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
      product_name: '',
      product_details: '',
      product_category: '',
      product_pic: '',
      estimated_price: '',
      starting_price: '',
      city: '',
      pincode: '',
    });
    props.onHide();
  };

  const handleFeedback = (msg) => {
    setFeedback({
      feedback: msg,
    });
  };

  const send = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      console.log(body);
      const response = await axios.put(
        `${Keys.BASE_API}user/updateInfo`,
        body,
        config
      );

      console.log(response.data);

      handleFeedback('update done');
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
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ alignItems: 'center' }}>
          Update User Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ textAlign: 'center' }}>Hi {props.user.name} !</h5>
        <h6 style={{ textAlign: 'center' }}>
          Please enter the following details.
        </h6>
        <form
          style={{ textAlign: 'center', padding: '10px' }}
          onSubmit={handleSubmit}
          method="PUT"
        >
          <div style={{ padding: '10px' }}>
            <input
              name="product_name"
              required="required"
              type="string"
              placeholder="Product Name"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="product_details"
              required="required"
              type="string"
              placeholder="Product Details"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="product_category"
              required="required"
              type="string"
              placeholder="Category"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="product_pic"
              required="required"
              type="string"
              placeholder="Image Link"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="starting_price"
              required="required"
              type="string"
              placeholder="Starting Price"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="estimated_price"
              required="required"
              type="string"
              placeholder="Estimated Price"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="city"
              required="required"
              type="string"
              placeholder="City"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="pincode"
              required="required"
              type="string"
              placeholder="Pincode"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAuctionModal;
