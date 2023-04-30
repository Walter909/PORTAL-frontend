import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SideButton from './Components/SideButton';
import Messages from './Components/Messages';

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

const BasicGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ProfileContainer>
            <SideButton />
          </ProfileContainer>
        </Grid>
        <Grid item xs={8}>
          <Messages />
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
