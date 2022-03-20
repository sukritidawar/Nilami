import {React,useState,useEffect} from 'react';
import axios from "axios";
import Keys from "../config";
import Store from "../store/Store";
import { useParams, useLocation } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
axios.defaults.withCredentials = true;


const TopBids = ({id}) => {

    const [topBids, setTopBids] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const getTopBids = async() => {
        try {
            const url = Keys.BASE_API +"auction/bidDetails/id/"+ id;
            trackPromise( axios.get(url).then((res)=>{
                setTopBids(res.data.bidDetails);
            }))
        } catch (error) {
            console.log(error);
        }
        }
        useEffect(async ()=>{
            await getTopBids();
            console.log(topBids);
        },[isLoading]);

        return (
            
            <div className='topBids'>
            {/* {!isLoading ? 
            <><h6>loading...</h6></>
                : ( */}
                    <div>
                    <p>Highest Bid:  {topBids[0].bid_amount}</p>
                    <p>Second highest Bid:  {topBids[1].bid_amount}</p>
                    <p>Third highest Bid:  {topBids[2].bid_amount}</p>
                </div>
                {/* )} */}
            </div>
        )
}

export default TopBids