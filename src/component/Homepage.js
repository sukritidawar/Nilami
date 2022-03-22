import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import {
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import Feed from './Feed';
import LoadingIndicator from './LoadingIndicator';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Keys from '../config';
import { trackPromise } from 'react-promise-tracker';
axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  feed_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      boxShadow: '5px',
      marginLeft: '5vw',
      marginRight: '5vw',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      marginLeft: '5vw',
      marginRight: '5vw',
    },
  },
}));

const Homepage = () => {
  const styles = useStyles();
  const [formData, setFormData] = useState({
    filterBy: '',
    valueAcc: '',
  });
  const [auctionFeed, setAuctionFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getDefaultAuctionFeed = async () => {
    try {
      const url = Keys.BASE_API + 'auction/feed';
      // var res = await axios.get(url);
      // console.log(res);
      // setAuctionFeed(res.data);
      // setLoading(false);
      // console.log(res);

      trackPromise(axios.get(url).then((res) => { setAuctionFeed(res.data) }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    await getDefaultAuctionFeed();
    console.log(auctionFeed);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    filterFunction(formData);
    setFormData({
      filterBy: '',
      valueAcc: '',
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
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <LoadingIndicator />
      <Grid component="main">
        {/* {!isLoading ? ( */}
        {/* ) : ( */}
        <Grid className={styles.feed_comp}>
          <form onSubmit={handleSubmit} method="POST">
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter by
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Filter by"
                    name="filterBy"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Location</MenuItem>
                    <MenuItem value={2}>Category</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} style={{ alignItems: 'center' }}>
                <input
                  name="valueAcc"
                  required="required"
                  type="string"
                  placeholder="Filter by"
                  onChange={handleChange}
                  size="50"
                  style={{ height: '54px' }}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  fullWidth
                  style={{ height: '54px', backgroundColor: 'rgb(231,111,81)' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid></Grid>
          <Grid container>
            {auctionFeed.map((auction) => (
              <Feed auction={auction} />
            ))}
          </Grid>
        </Grid>
        {/* )} */}
      </Grid>
    </>
  );
};

export default Homepage;
