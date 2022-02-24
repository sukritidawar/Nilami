import React from 'react'
import Header from './header/Header';
import Feed from './component/Feed';
import Grid from '@mui/material/Grid';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  feed_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      boxShadow : "5px",
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(15),
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  }
}));

const App = () => {
  const styles = useStyles();
  return (
    <>
      <Header />
      <Grid container spacing={2} className={styles.feed_comp}>
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

export default App
