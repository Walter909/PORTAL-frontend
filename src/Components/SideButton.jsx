import React from 'react';
import { Button } from '@mui/material';

import Game from '../Icons/Game.js';
import styled from '@emotion/styled';

const MyButton = styled(Button)`
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 20px;

  color: #ffffff;
`;

const SideButton = () => {
  return (
    <MyButton onclick={() => window.location.reload(true)} startIcon={Game}>
      Button
    </MyButton>
  );
};

export default SideButton;
