const express = require("express");

const hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", async (req, res) => {
  const rows = await hobbits.getAll();

  res.status(200).json(rows);
});

server.post("/hobbits", async (req, res) => {
  try {
    const hobbit = await hobbits.insert(req.body);
    res.status(201).json(hobbit);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the hobbit"
    });
  }
});

server.delete("/hobbits/id", async (req, res) => {
  try {
    const count = await hobbits.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The hobbit has been nuked" });
    } else {
      res.status(404).json({ message: "The hobbit could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the hobbit"
    });
  }
});

module.exports = server;
