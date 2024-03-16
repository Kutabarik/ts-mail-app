import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

/**
 * Initializes the socket server and returns the socket.io instance.
 *
 * @param server - The HTTP server instance to attach the socket server to.
 * @returns The socket.io instance.
 */
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