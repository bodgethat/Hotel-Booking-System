import Hotel from "../models/Hotel.js";

// Add Hotel
export const addHotel = async (req, res) => {
  try {
    const { name, city, address, price, imageUrl } = req.body;
    const hotel = await Hotel.create({ name, city, address, price, imageUrl });
    res.status(201).json(hotel);
  } catch (error) {
    console.error("Hotel add error:", error);
    res.status(500).json({ message: "Failed to add hotel" });
  }
};

// Get All Hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
};
