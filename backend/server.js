const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const path = require('path');

const userRoutes = require("./routes/userRoutes");
const containerRoutes = require("./routes/containerRoutes");
const storageRoutes = require("./routes/storageRoutes");
const activityRoutes = require("./routes/activityRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const mapRoutes = require('./routes/mapDataRoutes');
// const schedule = require('node-schedule');

// const Activity = require("./models/activityModel");
// const User = require('./models/userModel');

// const OneSignal = require('@onesignal/node-onesignal');
// const Stripe = require('stripe');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.enable("trust proxy")
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
app.use("/api/map-data", mapRoutes);

// business portal
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../business-portal/build')));

//   app.get("/business", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '../', 'business-portal', 'build', 'index.html')
//     )
//   })

//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '../', 'business-portal', 'build', 'index.html')
//     )
//   })
// }


// const app_key_provider = {
//   getToken() {
//     return "YjQ0MzMxNGQtYzM2ZS00NjQ4LTkzN2EtNDM0NGI2OTAxMDY5";
//   }
// };

// const configuration = OneSignal.createConfiguration({
//   authMethods: {
//     app_key: {
//       tokenProvider: app_key_provider
//     }
//   }
// });

// const client = new OneSignal.DefaultApi(configuration);

// const rule = new schedule.RecurrenceRule();
// let time = new Date();
// time.setSeconds(time.getSeconds() + 3);
// rule.second = time.getSeconds();
// //run it 3 sec after code starts ish

// const job = schedule.scheduleJob(rule, async function () {
//   let activities = await Activity.find({ finished: false });
//   let curTime = new Date();

//   for (let i = 0; i < activities.length; i++) {
//     let a = new Date(activities[i].createdAt)
//     let b = new Date(activities[i].createdAt)

//     b.setMonth(a.getMonth() + 1)
//     a.setDate(a.getDate() + 14)

//     const notification = new OneSignal.Notification();
//     notification.app_id = "163981d3-1de2-47aa-b5ce-51271b045927";
//     //notification.included_segments = ['Subscribed Users'];
//     notification.include_external_user_ids = [activities[i].user_to];

//     if (curTime.getTime() >= b.getTime()) {
//       activities[i].finished = true;
//       const updatedActivity = await activities[i].save();
//       notification.contents = {
//         en: "You have been fined for an overdue container."
//       };
//       const { id } = await client.createNotification(notification);
//       const stripeId = (await User.findById(activities[i].user_to)).stripeCustomerId;

//       // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
//       const charge = await stripe.charges.create({
//         amount: 900,
//         currency: 'aud',
//         source: 'tok_amex',
//         description: 'container late return charge',
//       });

//       const invoice = await stripe.invoices.create({
//         customer: stripeId,
//       });

//       console.log(curTime);
//       console.log(`charged customer ${activities[i]._id}`);
//     } else if (curTime.getTime() >= a.getTime()) {
//       notification.contents = {
//         en: "You have 2 weeks to return a container or you will be fined."
//       };
//       const { id } = await client.createNotification(notification);
//       console.log(curTime);
//       console.log("reminded a user");
//     }
//   }
// });

module.exports = {app};
