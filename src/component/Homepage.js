import React,{useState} from 'react'
import Header from '../header/Header';
import { Grid, Select, FormControl, MenuItem, InputLabel } from '@mui/material'
import Feed from './Feed';
import { makeStyles } from "@material-ui/core/styles";


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
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
        {/* <Header/> */}
      <Grid container spacing={2} className={styles.feed_comp}>
      <Grid item xs={10} md = {9}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={filter}
          label="Filter by"
          onChange={handleChange}>
          <MenuItem value={1}>Location</MenuItem>
          <MenuItem value={2}>Category</MenuItem>
        </Select>
      </FormControl>
      </Grid>
        <Grid item xs={12} md={4}>
          <Feed />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feed />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feed />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feed />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feed />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feed />
        </Grid>
      </Grid>


    </>
  )
}

export default Homepage