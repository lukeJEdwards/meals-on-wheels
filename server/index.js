const app = require("express")();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const options = {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
};
const io = require("socket.io")(server, options);

//? DB connection
const URL = "mongodb://127.0.0.1:27017/Mow";
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected:", URL);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});

//? static routes
app.use(cors());
app.use(bodyParser.json());
const user_model = require("./models/user.js");
app.get("/api/:name", async (req, res) => {
  try {
    const user = await user_model.findOne({ username: req.params.name });
    if (user) {
      res.json({ Oauth: true, user });
    } else {
      res.json({ Oauth: false });
    }
  } catch (err) {
    res.json(err);
  }
});

//? dynamic routes
const client_model = require("./models/client");

get_clients = async () => {
  try {
    const clients = await client_model
      .find()
      .select(
        "_id forename surname address postcode comments dietaryRequirements"
      );
    return clients;
  } catch (err) {
    return { error: err };
  }
};

io.on("connection", async (socket) => {
  console.log("User connected");
  socket.emit("clients", await get_clients());
});

server.listen(3000, () => console.log("listen on port 3000"));
