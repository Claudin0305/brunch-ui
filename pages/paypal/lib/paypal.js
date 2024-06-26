import { paypal } from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

export default paypal;
