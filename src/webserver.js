const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send(`Welcome to SecurityMonitor!\n\nSecurityMonitor is a small webserver to allow UptimeRobot to keep SecurityBot Online 24/7!`)
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("\n\n\x1b[31m\x1b[1m[DroidHost]\x1b[35m\x1b[1m Recieved Command: \x1b[33m\x1b[1m\x1b[5mSTART_JS_MONITOR\x1b[0m")});
}
module.exports = keepAlive;
