import React, { useState } from 'react'
import { Grid, TextField,Button} from '@mui/material';


const defaultuser = {
  name: "",
  email: "",
  password: "",
  primary_number: "",
  address: "",
  city: "",
  pincode: "",
  mobile: ""
}

const Signup = () => {

  const [user, setUser] = useState(defaultuser);

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value })
  };

  const postData = async (e) => {

  };
  return (
    <>
      <form onSubmit={postData}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>

              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  placeholder='Name'
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder='Email'
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  placeholder='Password'
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  placeholder='Phone'
                  name="primary_number"
                  type="number"
                  value={user.primary_number}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Profile url"
                  variant="outlined"
                  placeholder='Profile url'
                  name="profile_url"
                  type="password"
                  value={user.profile_url}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="address"
                  variant="outlined"
                  placeholder='address'
                  name="address"
                  type="text"
                  value={user.address}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="city"
                  variant="outlined"
                  placeholder='city'
                  name="city"
                  type="text"
                  value={user.city}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Pincode"
                  variant="outlined"
                  placeholder='Pincode'
                  name="pincode"
                  type="number"
                  value={user.pincode}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  placeholder='Mobile'
                  name="mobile"
                  type="number"
                  value={user.mobile}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={5}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                mt={1}>
                Submit
              </Button>
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} md={5}>

            <img src="https://media.istockphoto.com/photos/courtroom-concept-picture-id897099028?k=20&m=897099028&s=612x612&w=0&h=KdVJd5CHaqoYwAyqQW5Fled5s-kJ0lfQWdzFSV4RP7g="
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Signup;