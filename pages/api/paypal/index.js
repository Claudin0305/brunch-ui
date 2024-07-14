import paypal from "paypal-rest-sdk";
import axios from "axios";
paypal.configure({
  mode: "sandbox", // Replace with 'live' for production
  client_id: process.env.PAYPAL_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});
// console.log(process.env.PAYPAL_ID);

export default async function handler(req, res) {
  // paypal.configure({
  //   mode: "sandbox", // Replace with 'live' for production
  //   client_id: process.env.PAYPAL_ID,
  //   client_secret: process.env.PAYPAL_SECRET_KEY,
  // });

  if (req.method === "POST") {
    // console.log(req.body);
    try {
      let amount = (await req.body.amount) + ".00";
      // console.log(process.env.BASE_ROUTE_FRONT);
      let create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `${process.env.BASE_ROUTE_FRONT}/api/paypal`,
          cancel_url: `${process.env.BASE_ROUTE_FRONT}/failed`,
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "item",
                  sku: "item",
                  price: amount,
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              total: amount,
              currency: "USD",
            },
            description: "This is the payment description",
            custom: `${req.body.data.id_participant}-${amount}`,
          },
        ],
      };
      await paypal.payment.create(
        create_payment_json,

        function (error, payment) {
          console.log(payment);
          if (error) {
            console.log(error);
            throw error;
          } else {
            console.log(payment);
            let data = payment;
            res.json(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "GET") {
    try {
      // console.log(req.body);
      // console.log(req.query);
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
            // console.log(payment);
            const response = JSON.stringify(payment);
            const parseResponse = JSON.parse(response);
            // console.log(parseResponse);
            let d = parseResponse.transactions;
            d=d[0].custom.split('-')
            // console.log(d[1])
            axios.post(
              `${process.env.base_route_get}/paiement-repas/${d[0]}`,
              {
                payeur: `${parseResponse.payer.payer_info.first_name} ${parseResponse.payer.payer_info.last_name}`,
                email_payeur: parseResponse.payer.payer_info.email,
                montant_paye: d[1],
              }
            ).then(resp=>{
              // console.log(resp)
            });
            return res.redirect(`/success/${d[0]}`);
          }
        }
      );
    } catch (error) {}
  }
}
