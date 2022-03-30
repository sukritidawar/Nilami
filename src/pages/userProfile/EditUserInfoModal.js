import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
axios.defaults.withCredentials = true;

const EditUserInfoModal = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    primary_mobile: '',
    email: '',
    profile_pic: '',
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
      name: '',
      primary_mobile: '',
      email: '',
      profile_pic: '',
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
              name="name"
              required="required"
              type="string"
              placeholder="Your name"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="email"
              required="required"
              type="string"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="primary_mobile"
              required="required"
              type="string"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              name="profile_pic"
              required="required"
              type="string"
              placeholder="image link"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <button type="submit" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserInfoModal;
