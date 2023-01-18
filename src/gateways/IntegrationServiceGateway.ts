import { Order } from "./../models/order/Order";
export const sendOrderAfter1MinuteDelay = async (order: Order) => {
  setTimeout(() => {
    // send order to integration service
    console.log("Order sent to integration service");
  }, 60000);
};
