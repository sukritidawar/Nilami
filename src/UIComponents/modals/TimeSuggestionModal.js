import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Keys from '../../config';
import dateFormat from "dateformat";
axios.defaults.withCredentials = true;

const TimeSuggestion = (props) => {
  const [formData, setFormData] = useState({
    freeStartDate: '',
    freeStartTime: '',
    freeEndDate: '',
    freeEndTime: '',
    estimatedPrice: '',
    category: '',
    city: '',
    duration: null,
  });
  const [showSuggestion, setShowSuggestion] = useState(false);
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
      freeStartDate: '',
      freeStartTime: '',
      freeEndDate: '',
      freeEndTime: '',
      estimatedPrice: '',
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
      style={{ marginTop: '50px' }}
    >
      <Modal.Header closeButton>
        <Modal.Title >
          Time Sugggestion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px' }}>
        {showSuggestion ?
          <p>
            Time Suggested is: {dateFormat(timeSuggested, "yyyy-mm-dd")}  {dateFormat(timeSuggested, "HH:MM:ss")}
          </p>
          :
          <>
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
                  name="estimatedPrice"
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
            Enter the time range, when you are available to host the auction:
            <div style={{ padding: '10px' }}>
                Availability Start Date:  <input
                  name="freeStartDate"
                  required="required"
                  type="date"
                  placeholder="start date"
                  onChange={handleChange}
                />
              </div>
              <div style={{ padding: '10px' }}>
                Availability Start Time:  <input
                  name="freeStartTime"
                  required="required"
                  type="time"
                  placeholder="start time"
                  onChange={handleChange}
                />
              </div>
              <div style={{ padding: '10px' }}>
                Availability End Date:  <input
                  name="freeEndDate"
                  required="required"
                  type="date"
                  placeholder="end date"
                  onChange={handleChange}
                />
              </div>
              <div style={{ padding: '10px' }}>
                Availability End Time:  <input
                  name="freeEndTime"
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
                <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#00B9F1' }}>
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
