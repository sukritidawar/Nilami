/* Modal displayed to user to register in an auction.*/

import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
axios.defaults.withCredentials = true;

const RegisterModal = (props) => {
  const [formData, setFormData] = useState({
    anonymous: 'off',
    auction_id: `${props.id}`,
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
      anonymous: 'off',
      auction_id: `${props.id}`,
    });
    props.onHide();
  };

  // Add details to register the user, in the database.
  const send = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      console.log(body);
      const url = Keys.BASE_API + 'user/register/auction';
      const response = await axios.post(url, body, config);
      console.log(response.data);
      if (response.data.success) {
        props.onRegister();
        alert('successfully registered!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Register Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '30px' }}>
        <h6>
          Would you like to keep yourself anonymous if you win the auction?
        </h6>
        <form style={{ padding: '10px' }} onSubmit={handleSubmit} method="POST">
          <div style={{ padding: '10px' }}>
            Keep me Anonymous:{' '}
            <input
              name="anonymous"
              required="required"
              type="checkbox"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <Button type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
