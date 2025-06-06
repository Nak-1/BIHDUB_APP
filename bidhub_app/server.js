import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("join_auction", (auctionId) => {
      socket.join(`auction_${auctionId}`);
      console.log(`User ${socket.id} joined auction ${auctionId}`);
    });
    
    socket.on("new_bid", (bidData) => {
      console.log("New bid received:", bidData);
      io.to(`auction_${bidData.auctionId}`).emit("bid_update", bidData);
    });
    
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});