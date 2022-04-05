/* Modal to create new auction. 
Suitable time to start auction is also suggested.
*/

import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
import TimeSuggestion from './TimeSuggestionModal';
axios.defaults.withCredentials = true;

const CreateAuctionModal = (props) => {
  const [timeSuggestionShow, settimeSuggestionShow] = useState(false);
  const handleClosetimeSuggestion = () => settimeSuggestionShow(false);
  const handleShowtimeSuggestion = () => settimeSuggestionShow(true);

  const [formData, setFormData] = useState({
    inviteBidders: 'off',
    product_name: '',
    product_details: '',
    product_category: '',
    product_pic: '',
    estimated_price: '',
    starting_price: '',
    city: '',
    pincode: '',
    is_private: 'off',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
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
      inviteBidders: 'off',
      product_name: '',
      product_details: '',
      product_category: '',
      product_pic: '',
      estimated_price: '',
      starting_price: '',
      city: '',
      pincode: '',
      is_private: 'off',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
    });
    props.onHide();
  };

  const handleFeedback = (msg) => {
    setFeedback({
      feedback: msg,
    });
  };

  // Add new auction created by the user to the database.
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
        `${Keys.BASE_API}auction/new`,
        body,
        config
      );

      console.log(response);
      console.log(body);

      handleFeedback('update done');
    } catch (error) {
      console.log(error);
      handleFeedback('Something went wrong, Try Again.');
    }
  };

  return (
    <Modal {...props} size="lg" style={{ marginTop: '50px' }}>
      <Modal.Header closeButton >
        <Modal.Title>Create Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px', margin: '10px' }}>
        <div style={{ marginLeft: '20px' }}>
          <h5>Hi there! Please enter the following details.</h5>
        </div>
        <form style={{ padding: '10px' }} onSubmit={handleSubmit} method="PUT">
          <div
            style={{
              padding: '10px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <input
                name="inviteBidders"
                required="required"
                type="checkbox"
                onChange={handleChange}
              />
              Invite Bidders{' '}
            </div>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <input
                name="is_private"
                required="required"
                type="checkbox"
                onChange={handleChange}
              />
              Private
            </div>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <select
                name="product_category"
                required="required"
                placeholder="Category"
                onChange={handleChange}
              >
                <option value="none" selected disabled hidden>Select</option>
                <option value="art">Art</option>
                <option value="antique">Antique</option>
                <option value="religious">Religious</option>
                <option value="electronics">Electronics</option>
                <option value="other">Other</option>
              </select>
              Category
            </div>
          </div>
          <div style={{ padding: '10px' }}>
            Product Name:{' '}
            <input
              name="product_name"
              required="required"
              type="string"
              placeholder="Product Name"
              onChange={handleChange}
              style={{ width: '75%' }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            Product Details:{' '}
            <input
              name="product_details"
              required="required"
              type="string"
              placeholder="Product Details"
              onChange={handleChange}
              style={{ width: '75%' }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            Image link:{' '}
            <input
              name="product_pic"
              required="required"
              type="string"
              placeholder="Image Link"
              onChange={handleChange}
              style={{ width: '75%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ padding: '10px' }}>
              Starting Price:{' '}
              <input
                name="starting_price"
                required="required"
                type="string"
                placeholder="Starting Price"
                onChange={handleChange}
                style={{ width: '45%' }}
              />
            </div>
            <div style={{ padding: '10px' }}>
              Estimated Price:{' '}
              <input
                name="estimated_price"
                required="required"
                type="string"
                placeholder="Estimated Price"
                onChange={handleChange}
                style={{ width: '45%' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '79px', alignItems: 'center' }}>
            <div style={{ padding: '10px' }}>
              City:{' '}
              <input
                name="city"
                required="required"
                type="string"
                placeholder="City"
                onChange={handleChange}
                style={{ width: '45%' }}
              />
            </div>
            <div style={{ padding: '10px' }}>
              Pincode:{' '}
              <input
                name="pincode"
                required="required"
                type="string"
                placeholder="Pincode"
                onChange={handleChange}
                style={{ width: '45%' }}
              />
            </div>
          </div>
          <div style={{ padding: '10px' }}>
            <Button
              onClick={handleShowtimeSuggestion}
              style={{ backgroundColor: '#00B9F1', alignSelf: 'center' }}
            >
              Suggest Time
            </Button>
            <TimeSuggestion
              show={timeSuggestionShow}
              onHide={handleClosetimeSuggestion}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ padding: '10px' }}>
              Start Date:{' '}
              <input
                name="start_date"
                required="required"
                type="date"
                placeholder="start date"
                onChange={handleChange}
                style={{ width: '50%' }}
              />
            </div>
            <div style={{ padding: '10px' }}>
              Start Time:{' '}
              <input
                name="start_time"
                required="required"
                type="time"
                placeholder="start time"
                onChange={handleChange}
                style={{ width: '50%' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ padding: '10px' }}>
              End Date:{' '}
              <input
                name="end_date"
                required="required"
                type="date"
                placeholder="end date"
                onChange={handleChange}
                style={{ width: '52%' }}
              />
            </div>
            <div style={{ padding: '10px' }}>
              End Time:{' '}
              <input
                name="end_time"
                required="required"
                type="time"
                placeholder="end time"
                onChange={handleChange}
                style={{ width: '50%' }}
              />
            </div>
          </div>
          <div style={{ padding: '10px', alignContent: 'center', alignItems: 'center' }}>
            <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#00B9F1' }}>
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAuctionModal;
