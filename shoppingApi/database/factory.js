'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash=use('Hash')
Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email:faker.email({domain:"amitkadivar.xyz"}),
    password:await Hash.make(faker.password())
  }
});

Factory.blueprint('App/Models/Product',async (faker)=>{
    return{
        productImage:faker.avatar(),
        title:faker.word({
            length:6
        }),
        description:faker.paragraph(),
        price:faker.integer({min:10000.99,max:100000.99})
    }
})

// Factory.blueprint("App/Models/Order",async(faker)=>{
//     return{
//         quantity:fa
//     }

// })