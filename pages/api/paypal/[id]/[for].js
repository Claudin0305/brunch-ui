import paypal from "paypal-rest-sdk";
import axios from "axios";
paypal.configure({
  mode: "sandbox", // Replace with 'live' for production
  client_id: process.env.PAYPAL_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});
console.log(process.env.PAYPAL_ID);

export default async function handler(req, res) {
  // paypal.configure({
  //   mode: "sandbox", // Replace with 'live' for production
  //   client_id: process.env.PAYPAL_ID,
  //   client_secret: process.env.PAYPAL_SECRET_KEY,
  // });

  if (req.method === "GET") {
    console.log(req)
    try {
      console.log(req.body);
      console.log(req.query);
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const checkout_json = {
        payer_id: payerId,
        // transactions: [
        //   {
        //     amount: { currency: "USD", total: "1.00" },
        //     description: "This is the description",
        //   },
        // ],
      };
      paypal.payment.execute(
        paymentId,
        checkout_json,
        function (error, payment) {
          if (error) {
            console.log(error);
            return res.redirect("/failed");
          } else {
            console.log(payment);
            const response = JSON.stringify(payment);
            const parseResponse = JSON.parse(response);
            console.log(parseResponse);
            return res.redirect("/success");
          }
        }
      );
    } catch (error) {}
  }
}
