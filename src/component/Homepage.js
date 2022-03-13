import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import { Grid, Select, FormControl, MenuItem, InputLabel, Button } from '@mui/material'
import Feed from './Feed';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Keys from "../config";
axios.defaults.withCredentials = true;


const useStyles = makeStyles((theme) => ({
  feed_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      boxShadow: "5px",
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  }
}));

const Homepage = () => {

  const styles = useStyles();
  const [formData, setFormData] = useState({
    filterBy: "",
    valueAcc: "",
  });
  const [auctionFeed, setAuctionFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getDefaultAuctionFeed = async () => {
    try {
      const url = Keys.BASE_API + "auction/feed";
      var res = await axios.get(url);
      setAuctionFeed(res.data);
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(async () => {
    await getDefaultAuctionFeed();
    console.log(auctionFeed);
  }, [isLoading]);



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    filterFunction(formData);
    setFormData({
      filterBy: "",
      valueAcc: "",
    });
  };

  const filterFunction = async (formData) => {
    try {
      var url;
      if (formData.filterBy == 1) {
        url = Keys.BASE_API + `auction/location_filter/${formData.valueAcc}`;
      } else {
        url = Keys.BASE_API + `auction/category_filter/${formData.valueAcc}`;
      }
      const res = await axios.get(url);
      setAuctionFeed(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log(formData.valueAcc);
    console.log(formData.filterBy);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {<Header />}
      {isLoading ?
        <h2>loading...</h2>
        :
        <Grid container className={styles.feed_comp}>
          <Grid item md={7}></Grid>
          <Grid item xs={12} md={3}>
            <form onSubmit={handleSubmit} method="POST">
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          label="Filter by"
                          name="filterBy"
                          onChange={handleChange}>
                          <MenuItem value={1}>Location</MenuItem>
                          <MenuItem value={2}>Category</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5} style={{ alignItems: 'center' }}>
                      <input
                        name="valueAcc"
                        required="required"
                        type="string"
                        placeholder="address"
                        onChange={handleChange}
                        style={{ width: 99 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit" onClick={handleSubmit}
                    fullWidth style={{ backgroundColor: 'rgb(231,111,81)' }}
                  >Search</Button>
                </Grid>
              </Grid>
            </form>
          </Grid >
          <Grid item xs={12} style={{ alignContent: 'center', marginLeft: 40 }}>
            <Grid container style={{ alignContent: 'center', padding: 10 }}>
              {
                auctionFeed.map((auction) => (
                  <Feed auction={auction} />
                ))
              }
            </Grid>
          </Grid>
        </Grid >
      }
    </>
  )
}

export default Homepage