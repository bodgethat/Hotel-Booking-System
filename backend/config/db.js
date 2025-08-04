import { Sequelize } from "sequelize";

// ✅ MySQL Connection using Sequelize
const sequelize = new Sequelize("hotel_booking", "root", "2255", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
