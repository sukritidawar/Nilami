import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
axios.defaults.withCredentials = true;

const TimeSuggestion = (props) => {
  const [formData, setFormData] = useState({
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    estimated_price: '',
    category: '',
    city: '',
    duration: null,
  });
  const [showSuggestion,setShowSuggestion] = useState(false);
  const [timeSuggested, setTimeSuggested] = useState(null);

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
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        estimated_price: '',
        category: '',
        city: '',
        duration: '',
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
        `${Keys.BASE_API}auction/timeSuggestion`,
        body,
        config
      );

      console.log(response);
      setTimeSuggested(response.data);
      setShowSuggestion(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title >
          Time Sugggestion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '30px' }}>
        {showSuggestion?<p>Time Suggested is: {timeSuggested}</p> : <>
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
                Product Category:  <select
                name="category"
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
            Enter the time range, when you want to host the auction:
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
            <div style={{ padding: '10px' }}>
                Duration of Auction:  <input
                name="duration"
                required="required"
                type="integer"
                placeholder="in seconds"
                onChange={handleChange}
                />
            </div>
            <div style={{ padding: '10px', alignContent: 'center' }}>
                <Button type="submit" onClick={handleSubmit}>
                Submit
                </Button>
            </div>
            </form>
        </>}
      </Modal.Body>
    </Modal>
  );
};

export default TimeSuggestion;
