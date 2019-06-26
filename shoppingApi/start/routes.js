'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Helpers =use('Helpers')
const Route = use('Route')
const SpreadSheet = use('SpreadSheet')
const User = use("App/Models/User")
const Product = use("App/Models/Product")
const Order = use("App/Models/Order")
Route.get('/', () => {
  return { greeting: 'Hello world in Shoping Api /product to get all product list' }
})
Route.get('/product','ProductController.index');
Route.get("/product/:id",'ProductController.show').middleware(['auth:jwt'])
Route.post("/product",'ProductController.create').middleware(['auth:jwt']).validator(['CreateProduct'])
Route.patch("/product/:id","ProductController.update").middleware(['auth:jwt']) 
Route.delete("/product/:id","ProductController.delete").middleware(['auth:jwt'])

// userRouter
Route.post('/signup',"UserController.signup").validator(['UserCreate'])
Route.post('/login',"UserController.login")

Route.resource('order','OrderController').validator(new Map([
  [
    ['order.store'],
    ['CreateOrder']
  ]
])).middleware(['auth:jwt'])


Route.get('/file/:dbname/:format', "FileController.fileexport").middleware(['auth:jwt'])
Route.post('/file/upload', "FileController.uploadproduct").middleware(['auth'])

Route.get('/file/upload',async({request,response})=>{
  // console.log(request.originalUrl())
  return response.success(201,"Access this link ")
}).middleware(['signedurl','auth'])