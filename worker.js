/**
 * Created by songyangpu on 16/6/3.
 */
const net = require('net');
process.on('message', function (m, handle) {
    start(handle);
});

var buf = 'hello Node.js';
var res = ['HTTP/1.1 200 OK','content-length:'+buf.length].join('\r\n')+'\r\n\r\n'+buf;
var counter=0;

function start(handle) {
    counter++;
    console.log('got a connection on worker, pid = %d, counter=%d', process.pid, counter);
    var socket = new net.Socket({
        handle: handle
    });
    socket.readable = socket.writable = true;
    socket.end(res);
}