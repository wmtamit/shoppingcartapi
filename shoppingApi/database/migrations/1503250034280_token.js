'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.createIfNotExists('tokens', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').on("users").onDelete('cascade');
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('tokens')
  }
}

module.exports = TokensSchema
