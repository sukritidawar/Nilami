import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
import TimeSuggestion from "./TimeSuggestion";
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
    end_time: ''

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
      end_time: ''
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
      const response = await axios.post(
        `${Keys.BASE_API}auction/new`,
        body,
        config
      );

      console.log(response);

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
    >
      <Modal.Header closeButton>
        <Modal.Title >
          Create Auction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '30px' }}>
        <h5 >Hi there !</h5>
        <h6 >
          Please enter the following details.
        </h6>
        <form
          style={{ padding: '10px' }}
          onSubmit={handleSubmit}
          method="PUT"
        >
          <div style={{ padding: '10px' }}>
            {/* make chekbox of this */}
            Invite Bidders: <input
              name="inviteBidders"
              required="required"
              type="checkbox"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            Private:  <input
              name="is_private"
              required="required"
              type="checkbox"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            Category:  <select
              name="product_category"
              required="required"
              placeholder="Category"
              onChange={handleChange}>
              <option value="art">Art</option>
              <option value="antique">Antique</option>
              <option value="antique">Religious</option>
            </select>
          </div>
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
            <Button onClick={handleShowtimeSuggestion} style={{backgroundColor: "green" }}>
                Suggest Time
            </Button>
            <TimeSuggestion show={timeSuggestionShow} onHide={handleClosetimeSuggestion} />
          </div>
          <div style={{ padding: '10px' }}>
            Start Date:  <input
              name="start_date"
              required="required"
              type="date"
              placeholder="start date"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            Start Time:  <input
              name="start_time"
              required="required"
              type="time"
              placeholder="start time"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            End Date:  <input
              name="end_date"
              required="required"
              type="date"
              placeholder="end date"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px' }}>
            End Time:  <input
              name="end_time"
              required="required"
              type="time"
              placeholder="end time"
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: '10px', alignContent: 'center' }}>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAuctionModal;
