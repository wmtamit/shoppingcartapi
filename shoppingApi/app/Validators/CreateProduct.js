'use strict'


class CreateProduct {
  get rules () {
    return {
      "title":"required",
      "description":"required",
      "price":"required | integer",
      "productImage":"required ",
      // 'productImage':'productImage | max:1'
    }
  }
  async fails(error){
    return this.ctx.response.json({error})
  }
}

module.exports = CreateProduct
