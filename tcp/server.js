'use strict'

const net = require('net');
const { cpuCount, divideArr } = require('../helpers/helpers.js');

const task = divideArr([2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11], cpuCount);
let tasksDone = 0;
const results = [];

const server = net.createServer(socket => {
  socket.write(JSON.stringify(task[tasksDone++]));
  socket.on('data', data => {
    const res = JSON.parse(data);
    results.push(res);
    if (results.length === cpuCount) {
      console.dir({ results });
      process.exit(0);
    }
  });
});

server.listen(2000);
