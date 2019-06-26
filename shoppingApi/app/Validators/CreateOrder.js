'use strict'

class CreateOrder {
  get rules () {
    return {
    product_id: 'required | productexists:products,id',
    quantity:'required | integer'
    }
  }
  async fails(error) {
    return this.ctx.response.json({error})
  }
}

module.exports = CreateOrder
