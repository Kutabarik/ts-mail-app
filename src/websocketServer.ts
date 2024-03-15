import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const initSocketServer = (server: HttpServer) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return io;
};

export default initSocketServer;