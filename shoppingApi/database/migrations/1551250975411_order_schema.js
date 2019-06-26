'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.createIfNotExists('orders', (table) => {
      table.increments()
      table.integer('product_id').unsigned().notNullable().references('id').on('products').onDelete('cascade');
      table.integer('quantity').notNullable()
      table.integer('user_id').unsigned().references('id').on("users").onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('orders')
  }
}

module.exports = OrderSchema
