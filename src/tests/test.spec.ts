/* eslint-disable @typescript-eslint/no-var-requires */
export const app = require("../../app");
export const request = require("supertest");

describe("Order endpoints", () => {
  it("should create order", async () => {
    const order = {
      user: {
        username: "username2",
        id: "id2",
        photoUrl: "photoUrl2",
      },
      time: 100,
      products: [
        { id: "1", count: 1 },
        { id: "2", count: 2 },
      ],
    };
    const createdOrder = (
      await request(app)
        .post("/orders")
        .send(order)
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer 123qwe")
    ).body;
    expect(createdOrder).toHaveProperty("id");
  });
  it("should cancel order", async () => {
    const cancelledOrder = (
      await request(app)
        .put("/orders/cancel/63c815d532a36c44a1e21264")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer 123qwe")
    ).body;
    expect(cancelledOrder.modifiedCount).toBe(1);
  });
  it("should postpone order", async () => {
    const cancelledOrder = (
      await request(app)
        .put("/orders/63c815d532a36c44a1e21264/postpone/16023982")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer 123qwe")
    ).body;
    expect(cancelledOrder.modifiedCount).toBe(1);
  });
});

describe("Product endpoints", () => {
  it("should create Product", async () => {
    const product = {
      type: "type11",
      name: "name11",
      price: {
        type: "TL",
        amount: 100,
      },
      stock: 20,
    };
    const createdProduct = (
      await request(app)
        .post("/products")
        .send(product)
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer 123qwe")
    ).body;
    expect(createdProduct).toHaveProperty("id");
  });
  it("should delete product", async () => {
    const deletedProduct = (
      await request(app)
        .delete("/products/63c80db7d62b914d45bec678")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer 123qwe")
    ).body;
    expect(deletedProduct.modifiedCount).toBe(1);
  });
});
