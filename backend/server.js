const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const containerRoutes = require("./routes/containerRoutes");
const storageRoutes = require("./routes/storageRoutes");
const activityRoutes = require("./routes/activityRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const schedule = require('node-schedule');

const Activity = require("./models/activityModel");

connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
    exposedHeaders: ["jwt"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", userRoutes);
app.use("/api/containers", containerRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/payment-sheet", paymentRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const rule = new schedule.RecurrenceRule();
let time = new Date();
time.setSeconds(time.getSeconds() + 3);
rule.second = time.getSeconds();
//run it 3 sec after code starts ish

const job = schedule.scheduleJob(rule, async function () {
  const activities = await Activity.find({});
  let curTime = new Date();

  for (let i = 0; i < activities.length; i++) {
    let a = new Date(activities[i].createdAt)
    let b = new Date(activities[i].createdAt)

    b.setMonth(a.getMonth() + 1)
    a.setDate(a.getDate() + 14)

    if (curTime.getTime() >= b.getTime()) {
      console.log("fine is due");
    } else if (curTime.getTime() >= a.getTime()) {
      console.log("2 week reminder");
    }
  }
});