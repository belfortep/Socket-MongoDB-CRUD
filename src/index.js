const app = require('./app')
const { Server } = require('socket.io')
const http = require('http')
const { connectDB } = require('./db')
const sockets = require('./sockets');



connectDB()

const server = http.createServer(app)
const httpServer = server.listen(3000, () => {
    console.log('server on port 3000')
})
const io = new Server(httpServer)//conexion con el cliente. Es necesario pasarle un objeto de la clase http, no de express
sockets(io);


