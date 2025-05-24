import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { adminRoutes } from "./routes/admin";
import { authRoutes } from "./routes/auth";
import { mainRoutes } from "./routes/main";

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.use("/api/auth", authRoutes);
server.use("/api/admin", adminRoutes);
server.use("/api/main", mainRoutes);

server.listen(4444, () => {
  console.log("Server is running on Event api");
});
