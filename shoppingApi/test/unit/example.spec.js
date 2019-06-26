'use strict'

const { test,trait } = use('Test/Suite')('Example unit test') 

const User= use("App/Models/User")
trait('Test/ApiClient')

test('registerd user', async ({ client }) => {
  const response=await client.post('/signup').field({
    username:"testusersssfsssddddf",
    email:"testemail@sssssdsds.com",
    password:"12345"
  }).end()
    
// console.log(response.assertStatus(401))
  response.assertStatus(201)


  // response.assertJSONSubset([{
  // }])
})