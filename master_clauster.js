const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {// Master processes fork Worker processes.
    var numReqs = {};
    setInterval(() => {
        console.log(numReqs);
    }, 3000);
    // Count requests
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numReqs[msg.id]++;
        }
    }
    for (var i = 0; i < numCPUs-1; i++) {
        cluster.fork();
    }
    Object.keys(cluster.workers).forEach((id) => {
        numReqs[id]=0;
        cluster.workers[id].on('message', messageHandler);
    });
} else { // Worker processes have a http server.
    http.Server((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
        // notify master about the request
        process.send({ cmd: 'notifyRequest',id:cluster.worker.id });
    }).listen(3000);
}