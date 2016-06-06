/**
 * Created by songyangpu on 16/6/3.
 */


const net = require('net');
const fork = require('child_process').fork;
const cpus = require('os').cpus();
console.log(cpus.length);

var handle = net._createServerHandle('0.0.0.0', 3000);

var workers = [];
for (var i = 0; i < cpus.length-1; i++) {
    workers.push(fork('./worker'));
}
handle.listen();
handle.onconnection = function (err,handle) {
    var worker = workers.pop();
    worker.send({},handle);
    workers.unshift(worker);
};
// got a connection on worker, pid = 51038 count= 3459
// got a connection on worker, pid = 51036 count= 2861
// got a connection on worker, pid = 51035 count= 1589
// got a connection on worker, pid = 51037 count= 2124
