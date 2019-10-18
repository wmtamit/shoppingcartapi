'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.createIfNotExists('users', (table) => {
      table.increments()
      table.string('username', 81)
      table.string('email', 255).notNullable()
      table.string('password', 61).notNullable()
      table.integer('token_id').unsigned().references('id').on("tokens").onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema
