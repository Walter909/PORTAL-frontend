import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SideButton from './Components/SideButton';
import { TextField } from '@mui/material';

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080/broadcast');

// Connection opened
socket.addEventListener('open', event => {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', event => {
  console.log('Message from server ', event.data);
});

const ProfileContainer = styled.div`
  color: green;

  box-sizing: border-box;

  position: relative;
  width: auto;
  height: 650px;

  background: #000000;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
`;

const MessageContainer = styled.div`
  /* Message container */
  position: relative;
  width: auto;
  height: 650px;
  overflow-y: visible;

  background: #000000;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
`;

const MessageInput = styled.div`
  position: absolute;
  height: 30px;

  background: #ffffff;
  border-radius: 20px;
`;

const BasicGrid = () => {
  const inputRef = useRef(null);

  const [inputValuetext, setInputValueText] = useState('');

  const handleInputChange = event => {
    setInputValueText(event.target.value);
  };

  //Enter key sends a message
  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      console.log('Enter is pressed');
      setInputValueText('');
      inputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ProfileContainer>
            <SideButton />
          </ProfileContainer>
        </Grid>
        <Grid item xs={8}>
          <MessageContainer className="relative">
            <hr className="absolute bottom-10 w-full" />
            <MessageInput className="absolute bottom-1 w-full">
              <TextField
                id="inputField"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
                className="absolute bottom-3 w-full"
              />
            </MessageInput>
          </MessageContainer>
        </Grid>
        <Grid item xs={2}>
          <ProfileContainer />
        </Grid>
      </Grid>
    </Box>
  );
};

function App() {
  return <BasicGrid />;
}

export default App;
