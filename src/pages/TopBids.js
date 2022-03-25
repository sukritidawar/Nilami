import { React, useState, useEffect } from 'react';
import axios from "axios";
import Keys from "../config";
import Store from "../store/Store";
import { useParams, useLocation } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
axios.defaults.withCredentials = true;


const TopBids = ({ id }) => {

    const [topBids, setTopBids] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getTopBids = async () => {
        try {
            console.log(id);
            const url = Keys.BASE_API + "auction/bidDetails/id/" + id;
            trackPromise(axios.get(url).then((res) => {
                console.log(res);
                setTopBids(res.data.bidDetails);
            }))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(async () => {
        await getTopBids();
        console.log(topBids);
    }, [isLoading]);

    return (

        <div className='topBids'>

            <div>
                {topBids ? <>
                    {topBids[0].bid_amount == 0 ? <p>No Bid Yet. Be the First One to Bid.</p>:
                        <>
                            {topBids[0] ?
                                <p>Highest Bid:  {topBids[0].bid_amount}</p>
                                :
                                <></>
                            }
                            {topBids[1] ?
                                <p>Second Highest Bid:  {topBids[1].bid_amount}</p>
                                :
                                <></>
                            }
                            {topBids[2] ?
                                <p>Third highest Bid:  {topBids[2].bid_amount}</p>
                                :
                                <></>
                            }
                        </>
                    }
                </>:<>Loading...</>}
            </div>

        </div>
    )
}

export default TopBids