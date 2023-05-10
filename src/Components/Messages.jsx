import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { TextField, Container } from '@mui/material';
import {
  createWebSocket,
  getChannelMessages,
  socket,
} from '../utils/websocket';

//Open websockets
createWebSocket();

const MessagesContainer = styled.div`
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

const MessageUser = styled.div`
  /* Walter: */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  color: #ffffff;
`;

const MessageText = styled.div`
  /* Hi Daniel! */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  color: #ffffff;
`;

function Messages() {
  const [previousMessages, setPreviousMessages] = useState([]);

  const [liveMessages, setLiveMessages] = useState([]);

  const [allMessages, setAllMessages] = useState([]);

  const [username, setUsername] = useState('');

  const [inputValuetext, setInputValueText] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    socket.addEventListener('message', event => {
      console.log(event.data);

      const data = JSON.parse(event.data);

      if (data.setUsername) {
        setUsername(data.setUsername);
      } else {
        setLiveMessages([...liveMessages, data]);
      }
    });
  }, []);

  useEffect(() => {
    getChannelMessages().then(data => {
      setPreviousMessages(data);
    });
  }, []);

  useEffect(() => {
    setAllMessages([...previousMessages, ...liveMessages]);
  }, [liveMessages, previousMessages]);

  const handleInputChange = event => {
    setInputValueText(event.target.value);
  };

  //Enter key sends a message to server to be broadcasted
  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      console.log('Enter is pressed');

      const messageJson = {
        username: username,
        message: inputValuetext,
        channelId: 1,
      };

      inputRef.current.value = '';
      socket.send(JSON.stringify(messageJson));

      setLiveMessages([...liveMessages, messageJson]);
    }
  };

  return (
    <MessagesContainer>
      <Container className=" overflow-auto" id="MessageBox">
        {allMessages.map((data, i) => (
          <div key={i}>
            <MessageUser>{data.username}:</MessageUser>
            <MessageText className="rounded-lg border-2 border-white item-center">
              <div className="p-2">{data.message}</div>
            </MessageText>
          </div>
        ))}
      </Container>

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
    </MessagesContainer>
  );
}

export default Messages;
