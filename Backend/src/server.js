const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
