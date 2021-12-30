'use strict'

const net = require('net');
const { cpuCount } = require('../helpers/helpers.js');

const calculations = el => el * 2;

for (let i = 0; i < cpuCount; i++) {
  const socket = new net.Socket();
  socket.connect({
    port: 2000,
    host: '127.0.0.1',
  }, () => {
    socket.on('data', data => {
      const message = data.toString();
      const arr = JSON.parse(message);
      const res = arr.map(calculations);
      socket.write(JSON.stringify(res));

    });
  });
}