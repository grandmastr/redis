const net = require("net");

const server = net.createServer((connection) => {
  connection.on('data', data => {
    sendPongResponse(connection);
  })
});

server.listen(6379, "127.0.0.1");

const sendPongResponse = socket => {
  socket.write('+PONG\r\n');
}
