import { useState } from "react";
import axios from "axios";

const AddHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    city: "",
    address: "",
    price: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/hotels", hotelData);
      setMessage("Hotel added successfully!");
      setHotelData({ name: "", city: "", address: "", price: "", imageUrl: "" });
    } catch (error) {
      setMessage("Failed to add hotel. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Hotel</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <input
          name="name"
          placeholder="Hotel Name"
          value={hotelData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />
        <input
          name="city"
          placeholder="City (Pokhara, Kathmandu, Simara)"
          value={hotelData.city}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={hotelData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <input
          name="price"
          placeholder="Price per night"
          value={hotelData.price}
          onChange={handleChange}
          type="number"
          className="w-full p-3 border rounded-lg mb-4"
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={hotelData.imageUrl}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
