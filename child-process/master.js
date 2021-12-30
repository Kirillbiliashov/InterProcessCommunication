'use strict';

const cp = require('child_process');
const { divideArr, cpuCount } = require('../helpers/helpers.js');

console.log('Started master:', process.pid);

const workers = [];
for (let i = 0; i < cpuCount; i++) {
  const worker = cp.fork('./worker.js');
  console.log('Started worker:', worker.pid);
  workers.push(worker);
}

const task = divideArr([2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11], cpuCount);
const results = [];
let tasksDone = 0;

workers.forEach((worker, i) => {

  worker.send({ task: task[i] });

  worker.on('exit', code => {
    console.log('Worker exited:', worker.pid, code);
  });

  worker.on('message', message => {

    console.log('Message from worker', worker.pid);
    console.log(message);

    results[i] = message.result;
    tasksDone++;

    if (tasksDone === cpuCount) {
      process.exit(0);
    }
  });

  setTimeout(() => process.exit(1), 5000);

});

