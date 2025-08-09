const mongoose = require("mongoose");

const db = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGO Connected".bold.green);
  } catch (error) {
    console.log(`Server is not connected to DB ${error}`.bold.red);
  }
};
module.exports = db;
