import React from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  FUNDING,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
const PaymentButton = ({ amount }) => {
  const style = { layout: "vertical" };
  const links = [
    {
      href: "https://api.sandbox.paypal.com/v2/checkout/orders/9VV89705R5555120F",
      rel: "self",
      method: "GET",
    },
    {
      href: "https://www.sandbox.paypal.com/checkoutnow?token=9VV89705R5555120F",
      rel: "approve",
      method: "GET",
    },
    {
      href: "https://api.sandbox.paypal.com/v2/checkout/orders/9VV89705R5555120F",
      rel: "update",
      method: "PATCH",
    },
    {
      href: "https://api.sandbox.paypal.com/v2/checkout/orders/9VV89705R5555120F/capture",
      rel: "capture",
      method: "POST",
    },
  ];
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };
  // const createOrder = async (data, actions) => {
  //     console.log("create order")
  //   // Replace with your server-side code to create a PayPal order
  //   const response = await fetch("/api/create-paypal-order", {
  //     method: "POST",
  //     body: JSON.stringify({ amount: amount }),
  //   });
  //   const order = await response.json();
  //   return order;
  // };
  // clientId={process.env.PAYPAL_ID}
  function createOrder() {
    // replace this url with your server
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              sku: "1blwyeo8",
              quantity: 2,
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((order) => {
        // Your code here after create the order
        console.log(order);
        return order.id;
      });
  }
  function onApprove(data) {
    // replace this url with your server
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => response.json())
      .then((orderData) => {
        // Your code here after capture the order
        console.log(orderData);
      });
  }
  // Custom component to wrap the PayPalButtons and show loading spinner
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    );
  };
  return (
    <div className="flex items-center justify-center">
      {/* <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider> */}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical", // or 'vertical'
            size: "medium", // or 'small', 'large'
            color: "gold", // or 'blue', 'silver', 'white'
            shape: "rect", // or 'pill'
          }}
          //   fundingSource={FUNDING.PAYPAL}
          fundingSource={undefined}
          createOrder={createOrder}
          // createOrder={(data, actions) => {
          //   return actions.order.create({
          //     purchase_units: [
          //       {
          //         amount: {
          //           value: amount, // Adjust amount as needed
          //           currency_code: "USD",
          //         },
          //       },
          //     ],
          //     links: links,
          //   });
          // }}
          onApprove={(data, actions) => {
            console.log("approuve");
            return actions.order.capture().then((orderData) => {
              console.log("Payment captured!", orderData);
              // Handle successful payment (e.g., display confirmation)
            });
          }}
          onError={(err) => {
            console.error("Error:", err);
            // Handle payment errors
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentButton;
