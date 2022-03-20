import React,{ useState, useContext } from 'react';
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Keys from "../config";
axios.defaults.withCredentials = true;

const RegisterModal = (props) => {

    const [formData, setFormData] = useState({
        anonymous: 'off',
        auction_id: `${props.id}`
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
        auction_id: `${props.id}`
      });
        props.onHide();
      }; 
      
      const send = async (formData) => {

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify(formData);
          console.log(body);
          const url = Keys.BASE_API + "user/register/auction";
          const response = await axios.post(url, body, config);
          console.log(response.data); 
          alert("successfully registered!!");
        } catch (error) {
          console.log(error);
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
          <Modal.Title style= {{alignItems: "center"}}>
            Register Auction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style= {{textAlign : "center"}}>Would you like to keep yourself anonymous if you win the auction?</h6>
          <form style ={{textAlign : "center", padding : "10px"}} onSubmit={handleSubmit} method="POST">
            <div style={{ padding: '10px' }}>
                Keep me Anonymous:  <input
                name="anonymous"
                required="required"
                type="checkbox"
                onChange={handleChange}
                />
            </div>
            <div style ={{padding : "10px"}}>
                <button type="submit" onClick={handleSubmit} >
                Register
                </button>
            </div>
              </form>
        </Modal.Body>
      </Modal>
    );
  }

  export default RegisterModal;
   

  
  
  
        
      
   
