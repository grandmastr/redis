const net = require('net');
const parseBuffer = require('./parser');

const PREFIXES = {
  STRING: '+',
  ERROR: '-',
  INTEGER: ':',
  BULK_STRING: '$',
  ARRAY: '*',
};

const server = net.createServer((connection) => {
  connection.on('data', data => {
    sendPongResponse(connection, data);
  });
});

server.listen(6379, '127.0.0.1');

const database = new Map();

const sendPongResponse = (socket, data) => {
  const [cmd, args] = parseBuffer(data);

  let resp;

  switch (cmd.toLowerCase()) {
    case 'ping':
      resp = `${PREFIXES.STRING}PONG`;
      break;
    case 'echo':
      resp = `${PREFIXES.STRING}${args[1]}`;
      break;
    case 'set':
      const [, key, , value, , cmd2, , timeout] = args;

      if (!database.has(key)) {
        database.set(key, value);
        resp = '+OK';

        if (cmd2 && timeout) {
          setTimeout(() => {
            database.delete(key);
          }, Number(timeout));
        }
      }
      break;
    case 'get':
      const [, _key] = args;
      if (database.has(_key)) {
        const value = database.get(_key);
        resp = `$${value.length}\r\n${value}`;
      } else {
        resp = `$${PREFIXES.ERROR}1\r\n`;
      }
      break;
    default:
      resp = '';
  }

  socket.write(`${resp}\r\n`);
};
