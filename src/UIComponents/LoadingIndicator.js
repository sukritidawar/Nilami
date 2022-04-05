/*Indicator displayed to th euser when a page is loading. */
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Spinner from 'react-spinkit';

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
            opacity: '50%',
            position: 'fixed',
            zIndex: 100,
            top: '0%',
            left: '0%',
          }}
        ></div>
        <Spinner
          name="circle"
          justify="center"
          style={{
            width: 100,
            height: 100,
            margin: 'auto',
            position: 'absolute',
            zIndex: 400,
            top: '40%',
            left: '50%',
          }}
        />
      </>
    )
  );
};
export default LoadingIndicator;
