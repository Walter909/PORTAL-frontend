import axios from 'axios';

let socket;

export function createWebSocket() {
  // Create WebSocket connection.
  socket = new WebSocket('ws://localhost:8080/websocket');
}

export function getChannelMessages() {
  return axios
    .get('http://localhost:8080/channel?id=1')
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export { socket };
