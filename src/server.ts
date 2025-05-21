import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { authRoutes } from "./routes/auth";

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.use("/api/auth", authRoutes);

server.listen(4444, () => {
  console.log("Server is running on http://localhost:3000");
});
