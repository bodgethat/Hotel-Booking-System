import Hotel from "../models/Hotel.js";

export const seedHotels = async () => {
  const existing = await Hotel.count();
  if (existing === 0) {
    await Hotel.bulkCreate([
      {
        name: "Hotel Annapurna",
        city: "Pokhara",
        address: "Lakeside, Pokhara",
        price: 4000,
        imageUrl: "https://example.com/pokhara.jpg",
      },
      {
        name: "Hotel Everest",
        city: "Kathmandu",
        address: "Thamel, Kathmandu",
        price: 3500,
        imageUrl: "https://example.com/kathmandu.jpg",
      },
      {
        name: "Hotel Simara Deluxe",
        city: "Simara",
        address: "Main Road, Simara",
        price: 2500,
        imageUrl: "https://example.com/simara.jpg",
      },
    ]);

    console.log("✅ Default hotels seeded!");
  } else {
    console.log("ℹ️ Hotels already exist. Skipping seeding...");
  }
};
