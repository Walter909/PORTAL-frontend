import React, { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import Game from '../src/Icons/Game';
import Food from '../src/Icons/Food.js';
import Messages from './Components/Messages';

const ProfileContainer = styled.div`
  box-sizing: border-box;

  position: relative;
  width: auto;
  height: 650px;

  background: #000000;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
`;

const MyButton = styled(Button)`
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 20px;

  width: 210px;
  color: #ffffff;
`;

const BasicGrid = () => {
  const [currentChannel, setCurrentChannel] = useState(1);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ProfileContainer>
            <MyButton onClick={() => setCurrentChannel(1)} startIcon={Game}>
              Game
            </MyButton>
            <hr />
            <MyButton onClick={() => setCurrentChannel(2)} startIcon={Food}>
              Food
            </MyButton>
          </ProfileContainer>
        </Grid>
        <Grid item xs={8}>
          <Messages channelId={currentChannel} />
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
