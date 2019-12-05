const http = require('http')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length;

const crypto = require('crypto');


if (cluster.isMaster) {
    console.log(`主进程${process.pid}正在运行`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程${worker.process.pid}已退出`)
    })
} else {
    const secret = '1706b';
    const hash = crypto.createHash('sha256')
    hash.update(secret)
    console.log(hash.digest('hex'))

    http.createServer((req, res) => {
        res.writeHead(200)
        res.end({
            
        })
    }).listen(8080, () => { })
}


