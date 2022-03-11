import React from 'react'
import { useContext, useEffect, useState } from "react";
import AuctionCommp from './AuctionCommp'
import { Grid, Typography, Button } from '@mui/material';
import Store from "../store/Store";
import axios from "axios";
import Keys from "../config";
import dateFormat from "dateformat";
import Feed from "../component/Feed"
axios.defaults.withCredentials = true;

const RegisteredAuction = () => {

    const [userAuth, setUserAuth] = useContext(Store);
    const [regAuctions,setRegAuctions] = useState([]);
    const [upAuctions,setUpAuctions] = useState(true);
    const [isLoading,setLoading] = useState(true);
    const [todayDate,setTodayDate] = useState(null);

    const getUpcomingAuctions = () => {
        setUpAuctions(true);
    }
    const getPastAuctions = () => {
        setUpAuctions(false);
    }

    const getRegAuctions = async () => {
        try {
            const url = Keys.BASE_API + "user/registeredAuctions";
            var res = await axios.get(url);
            setRegAuctions(res.data.registeredAuctions);

            var myDate = new Date();
            var x = dateFormat(myDate, "dd/mm/yy");
            setTodayDate(x);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(async ()=>{
        // if(userAuth.isAuth){
            getRegAuctions();

        // }else{
        //     console.log("user not authorised");
        // }
    },[isLoading]);
    

    return (
        <>
        {/* {userAuth.isAuth ? */}
            <>
            {isLoading ? <h6>Loading...</h6> : (
                <>
                <Typography variant="h3">MY REGISTERED AUCTION</Typography>
                <button onClick={getUpcomingAuctions}>Upcoming</button>
                <button onClick={getPastAuctions}>Past</button>
                <Grid container spacing={3}>
                {upAuctions ? regAuctions.map((auction) => (
                    <>{(dateFormat(auction.end_date,"dd/mm/yy") > todayDate) && <Feed auction = {auction} />}</>
                    
                )):regAuctions.map((auction) => (
                    <>{(dateFormat(auction.end_date,"dd/mm/yy") < todayDate) && <Feed auction = {auction} />}</>
                    
                ))}    
                </Grid>
                </>
                )} 
            </>
        {/* : <h6>user not authorised</h6>} */}
        </>

    )
}

export default RegisteredAuction