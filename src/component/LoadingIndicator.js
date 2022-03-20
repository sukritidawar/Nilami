import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from 'react-spinkit';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    
       return (
         promiseInProgress && 
         <Spinner
         name="circle"
         justify="center"
         style={{
           width: 100,
           height: 100,
           margin: 'auto',
         }}
       />
      );  
    }
export default LoadingIndicator;
