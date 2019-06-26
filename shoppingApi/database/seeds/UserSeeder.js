'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use("App/Models/User")
class UserSeeder {
  async run () {
    const user = await Factory.model("App/Models/User").create()
    // console.log(user)
    const product = await Factory.model("App/Models/Product").make()

    await user.products().save(product)
  }
}

module.exports = UserSeeder
