"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var startSocketServer = function (server) {
    var io = new socket_io_1.Server(server);
    var userSockets = {};
    io.on('connection', function (socket) {
        console.log('A user connected');
        var userId = socket.handshake.query.userId;
        socket.join("user-".concat(userId));
        socket.on('disconnect', function () {
            console.log('User disconnected');
        });
    });
    return { io: io, userSockets: userSockets };
};
exports.default = startSocketServer;
//# sourceMappingURL=websocketServer.js.map