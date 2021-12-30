'use strict'

const os = require('os');
const cpuCount = os.cpus().length;

const divideArr = (arr, n) => {
    const expLength = Math.ceil(arr.length / n);
    const res = [];
    for (let i = 0; i < expLength; i++) {
        res[i] = arr.splice(0, expLength);
    }
    return res;
}

module.exports = { cpuCount, divideArr }