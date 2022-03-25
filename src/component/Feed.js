import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dateFormat from "dateformat";
import Keys from "../config";
import axios from "axios";
import { useContext, useState, useEffect } from 'react';
import store from "../store/Store";
import FlashMessage from "react-flash-message";

axios.defaults.withCredentials = true;

const Feed = ({ auction }) => {
  const [feedLike, setfeedLike] = React.useState(`${auction.n_likes}`);
  const [authInfo, setAuthInfo] = useContext(store);
  const [likeColor, setlikeColor] = useState("gray");
  const [clipboardMessage, setMessage] = useState(false);
  const [timeUp,setTimeUp] = useState(false);
  const updateLikes = async () => {
    if (authInfo.isAuth) {
      try {
        const url = Keys.BASE_API + `auction/add_like/${auction.auction_id}`;
        var res = await axios.put(url);
        console.log(res);
        setfeedLike((prevValue) => { return parseInt(prevValue) + 1 });
        setlikeColor("red");
        console.log(feedLike);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("sf");
    }
  }

  const handleShareClick = () => {
    navigator.clipboard.writeText("http://localhost:3001/" + `feed/${auction.auction_id}`);
    setMessage(true);
  }

  const checkTimings = async() => {
    var myDate = new Date();
    var currentDate = dateFormat(myDate, "yyyy-mm-dd");
    var currentTime = dateFormat(myDate, "HH:MM:ss");
    console.log(currentDate);
    console.log(currentTime);
    if((dateFormat(auction.end_date,"yyyy-mm-dd") < currentDate) || ((dateFormat(auction.end_date,"yyyy-mm-dd") == currentDate)&& (currentTime > auction.end_time)) ) 
      setTimeUp(true);
  }

  useEffect(async () =>{
    await checkTimings();
  },[timeUp])

  

  const linkedto = `../feed/${auction.auction_id}`;
    
    return (
      <Card sx={{ margin: 2, width: { lg: '27vw', md: '36vw', xs: '66vw' }, padding: 2, border: '5px solid rgb(233, 196,106)', justifyContent: 'center', textAlign: 'center' }}>
      <Link to={linkedto} style={{ color: 'rgb(0,0,0)', textDecoration: "none", }}>
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            //     R
            //   </Avatar>
            // }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={
              <Typography style={{ fontFamily: 'serif', color: 'rgb(0,0,0)', fontSize: 36, textAlign: 'center', textTransform: 'uppercase' }}>
                {auction.product_name}
              </Typography>}
            subheader= {<Typography>Category: {auction.product_category}</Typography>}
          />
          
          {timeUp ? <><p style={{color:"red", marginBottom:"55px"}}>Closed</p></> : (<>
            <p>Date: {dateFormat(auction.start_date,"dd/mm/yy")} - {dateFormat(auction.end_date,"dd/mm/yy")}</p>
            <p>Time: {auction.start_time} - {auction.end_time}</p>
          </>)}
          </Link>
          <Link to = {linkedto}>
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.pixabay.com/photo/2018/09/09/18/04/judge-3665164_960_720.jpg"
            alt="Paella dish"
            style={{ margin: '10px 2px' }}
          />
          </Link>
          <CardContent>
            <Typography>
              {auction.is_private?<><p style={{color:'green'}}>(Private Auction)</p></>:<></>}
              {auction.product_details}
            </Typography>
            <br>
          </br>
          </CardContent>
          <CardActions disableSpacing>
          <div style={{ justifyContent: 'centre', display: 'inline', }}>
            <IconButton aria-label="add to favorites" onClick={updateLikes} style={{color:`${likeColor}`}}>
              <FavoriteIcon />
            </IconButton>
            {feedLike}
            </div>
            <IconButton aria-label="share" onClick={handleShareClick}>
              <ShareIcon />
              {clipboardMessage && (
                <FlashMessage duration={2000}>
                  <p style={{fontSize:"0.8rem"}}>link copied to clipboard!</p>
                </FlashMessage>

          )}
        </IconButton>
      </CardActions>

    </Card>
  );
}

export default Feed;
