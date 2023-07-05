const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const path = require('path');


const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const containerRoutes = require("./routes/containerRoutes");
const storageRoutes = require("./routes/storageRoutes");
const activityRoutes = require("./routes/activityRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const paymentRoutes = require('./routes/paymentRoutes')

connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.enable("trust proxy")
app.use(
  cors({
    // origin: "http://localhost:3001",
    // credentials: true,
    // exposedHeaders: ["jwt"],
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", userRoutes);
app.use("/api/containers", containerRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/payment-sheet", paymentRoutes);

// business portal
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../qr-scanner/build')));

  app.get("/business", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'qr-scanner', 'build', 'index.html')
    )
  })

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'qr-scanner', 'build', 'index.html')
    )
  })
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
