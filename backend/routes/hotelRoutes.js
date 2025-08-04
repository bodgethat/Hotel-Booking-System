import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// GET all hotels
router.get("/", async (req, res) => {
  const hotels = await Hotel.findAll();
  res.json(hotels);
});

// POST new hotel
router.post("/", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Failed to add hotel" });
  }
});

export default router;
