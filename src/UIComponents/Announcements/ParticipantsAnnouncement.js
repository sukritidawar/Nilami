import React, { useState, useEffect, useRef, useContext } from 'react';
import { Fire } from '../../auction/chatApp/firebasee';
import { useParams, useLocation } from 'react-router-dom';
import Store from '../../store/Store';
import { Grid, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';

const ParticipantsAnnouncement = () => {
  const scroll = useRef();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userAuth, setUserAuth] = useContext(Store);
  const [open, setOpen] = React.useState(true);
  const auctionDetails = useLocation().state;
  console.log(auctionDetails);
  console.log(open);
  const auctionId = id;
  const collectionName = 'Announcements_' + auctionId;
  console.log(collectionName);
  useEffect(() => {
    Fire.collection(`${collectionName}`)
      .orderBy('createdAt')
      .limit(30)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const userid = userAuth.user_id;
  return (
    <Box sx={{ width: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
      <Collapse in={open}>
        <Alert
          severity='info'
          action={
            <IconButton
              aria-label="close"
              color="info"
              onClick={() => {
                setOpen(false);
              }}
              sx={{ paddingLeft: 5 }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle><b>Announcements</b></AlertTitle>
          <Grid style={{ paddingLeft: 18, textAlign: 'left' }}>
            {messages.map(({ id, text, userName, uid }) => (
              <h6
                key={id}
                className={`msg ${uid === userid ? 'sent' : 'received'}`}
              >
                <b>{userName}:</b> {text}
              </h6>
            ))}
            <div ref={scroll}></div>
          </Grid>
        </Alert>
      </Collapse>

      <Button
        sx={{ marginTop: 2 }}
        disabled={open}
        hidden={`${open == false ? '' : 'hidden'}`}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        See Anouncements
      </Button>
    </Box >
  );
};

export default ParticipantsAnnouncement;
