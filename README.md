# Simple Redis Implementation

This project is a simple implementation of Redis in JavaScript. It uses Node.js and the `net` module to create a TCP server that can handle Redis commands.

## Features

- **Bind to a Port**: The server is set to listen on port 6379, which is the default port for Redis.

- **Respond to PING**: The server can respond to a PING command with a PONG.

- **Respond to Multiple PINGs**: The server can handle multiple PING commands concurrently.

- **Handle Concurrent Clients**: The server uses Node.js's event-driven, non-blocking I/O model, which makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

- **Implement the ECHO Command**: The server can respond to an ECHO command by sending back the same message.

- **Implement the SET & GET Commands**: The server can store key-value pairs with the SET command and retrieve the value with the GET command.

- **Expiry**: The server can handle key expiry. If a timeout is provided with the SET command, the key will be deleted after the specified time.

## Running the Server

To run the server, execute the following command:

```shell
node main.js
```

This will start the server and bind it to port 6379. You can then connect to it using a Redis client and execute commands.
