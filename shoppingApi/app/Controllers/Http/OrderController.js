"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
const { validate } = use("Validator");
const Database = use("Database");

const Order = use("App/Models/Order");
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let orders = await Order.all();
    const count = await Order.getCount();
    if (count > 0) {
      return response.status(200).json({ count: count, orders: { orders } });
    } else {
      return response.status(404).json({ message: "Order not found" });
    }
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const orderId = await Order.create({
        product_id: request.all().product_id,
        quantity:request.all().quantity,
        user_id:auth.user.id
      
      });
      return response
        .status(201)
        .json({ message: "Order create succefully", ordeId: orderId });
    } catch (e) {
      // console.log(e)
      return response
        .status(500)
        .json({ message: "Try again Order not Created ", error: e });
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    const order = await Order.findBy("id", params.id);
    console.log(order);
    if (order != null) {
      return response.status(200).json({
        order: order
      });
    } else {
      return response.status(404).json({ message: "Order not Found " });
    }
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const order = await Order.findBy("id", params.id);
    if (order != null) {
      const dele = await order.delete();
      if (dele === true) {
        return response.status(200).json({ message: "Order Delete succefuly" });
      } else {
        return response
          .status(200)
          .json({ message: "try again data not deleted" });
      }
    } else {
      return response.status(404).json({ message: "Order Not found" });
    }
  }
}

module.exports = OrderController;
