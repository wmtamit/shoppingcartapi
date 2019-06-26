'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.createIfNotExists('products', (table) => {
      table.increments()
      table.string('productImage')
      table.string("title")
      table.string('description')
      table.float("price")
      table.integer('user_id').unsigned().references('id').on("users").onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('products')
  }
}

module.exports = ProductSchema
