const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//? routes
const clientsRoutes = require("./routes/clients");
const userRoutes = require("./routes/users");
const weekRouters = require("./routes/weeks");
const deliverRoutes = require("./routes/delivers");
const PdfRoutes = require("./routes/pdfs");

//? database
const URL = "mongodb://127.0.0.1:27017/Mow";
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected:", URL);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});

//? app set up
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/clients", clientsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weeks", weekRouters);
app.use("/api/delivers", deliverRoutes);
app.use("/api/pdf", PdfRoutes);

app.use(express.static(__dirname + "/public"));
app.get(/.*/, (req, res) => res.send(__dirname + "public/index.html"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
