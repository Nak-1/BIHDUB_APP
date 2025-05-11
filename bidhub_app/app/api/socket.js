import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket.io server already running");
  } else {
    console.log(" Starting new Socket.io server...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      socket.on("new_bid", (bidData) => {
        console.log("New bid received:", bidData);
        io.emit("bid_update", bidData);
      });
      socket.on("join_auction", (auctionId) => {
        socket.join(`auction_${auctionId}`);
        console.log(`User ${socket.id} joined auction ${auctionId}`);
      });
      
      socket.on("auction_bid", (data) => {
        const { auctionId, bidData } = data;
        io.to(`auction_${auctionId}`).emit("auction_bid_update", bidData);
      });
      
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  res.end();
}
