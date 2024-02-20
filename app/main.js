const net = require('net');
const parseBuffer = require('./parser');

const server = net.createServer((connection) => {
  connection.on('data', data => {
    sendPongResponse(connection, data);
  });
});

server.listen(6379, '127.0.0.1');

const sendPongResponse = (socket, data) => {
  const [cmd, args] = parseBuffer(data);

  let resp;

  switch (cmd) {
    case 'ping':
      resp = 'PONG';
      break;
    case 'echo':
      resp = args;
      break;
    default:
      resp = '';
  }

  socket.write(`+${resp}\r\n`);
};
