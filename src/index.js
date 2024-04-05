import { Server } from "socket.io";
import { createServer } from "http";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(`<a href="/twitter">twitter</a>`);
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("message", ({ room, message }) => {
    if (room) {
      io.to(room).emit("receive-message", message);
    } else {
      socket.broadcast.emit("receive-message", message);
    }
  });
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });
  // socket.on("disconnect", () => {
  //   console.log("user disconnected", socket.id);
  // });
});

connectDB()
  .then(() => {
    server.listen(port, () =>
      console.log(`http://localhost:${port} is running`)
    );
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });
