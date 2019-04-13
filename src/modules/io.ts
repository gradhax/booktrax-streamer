import socketIO from 'socket.io';

const state = {
  io: null,
};

export function init(server) {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    const ts = new Date().toISOString();
    const socketId = socket.id;
    const origin = socket.handshake.headers.origin;
    console.log(
`
%s io.init(): connection succeeds,
origin: %s
id: %s
`,
      ts,
      socket.handshake.headers.origin,
      socket.id,
    );

    state.io = io;
    socket.emit('connection-result', {
      origin,
      socketId,
    });
  });
}

export function getIO() {
  if (!state.io) {
    throw new Error('io.getIO(): io is not initialized');
  }
  return state.io;
}
